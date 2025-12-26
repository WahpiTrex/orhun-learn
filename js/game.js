/**
 * ORHUN ALPHABET LEARNING GAME ENGINE
 * Bidirectional learning: Orhun→Latin and Latin→Orhun modes
 */

class OrhunGame {
    constructor() {
        // Game state
        this.currentLevel = 1;
        this.currentWordIndex = 0;
        this.currentLetterIndex = 0;
        this.learnedChars = new Set();
        this.stats = {};

        // Learning mode: 'orhun-to-latin' or 'latin-to-orhun'
        this.mode = 'orhun-to-latin';

        // Settings
        this.settings = {
            soundEnabled: true,
            hintsEnabled: true,
            alphabetBarEnabled: true
        };

        // DOM elements
        this.elements = {};

        // Initialize
        this.init();
    }

    init() {
        this.cacheElements();
        this.loadProgress();
        this.setupEventListeners();
        this.initializeStats();
    }

    cacheElements() {
        this.elements = {
            // Main game
            welcomeScreen: document.getElementById('welcomeScreen'),
            startBtn: document.getElementById('startBtn'),
            alphabetBar: document.getElementById('alphabetBar'),
            // Word section elements
            wordMeaning: document.getElementById('wordMeaning'),
            wordDisplayWrapper: document.querySelector('.word-display-wrapper'),
            wordQuestion: document.getElementById('wordOrhun'),
            wordAnswer: document.getElementById('wordLatin'),
            // Letter focus (will be hidden in new design)
            letterFocus: document.querySelector('.letter-focus'),
            letterCard: document.getElementById('letterCard'),
            currentLetter: document.getElementById('currentLetter'),
            currentLatin: document.getElementById('currentLatin'),
            hintText: document.getElementById('hintText'),
            // Answer grid
            letterGrid: document.getElementById('letterGrid'),
            feedback: document.getElementById('feedback'),

            // Settings modal
            settingsModal: document.getElementById('settingsModal'),
            settingsBtn: document.getElementById('settingsBtn'),
            closeSettings: document.getElementById('closeSettings'),
            soundToggle: document.getElementById('soundToggle'),
            hintsToggle: document.getElementById('hintsToggle'),
            alphabetBarToggle: document.getElementById('alphabetBarToggle'),
            resetProgress: document.getElementById('resetProgressBtn'),
            getCode: document.getElementById('getCodeBtn'),

            // Stats modal
            statsModal: document.getElementById('statsModal'),
            statsBtn: document.getElementById('statsBtn'),
            closeStats: document.getElementById('closeStats'),
            statsGrid: document.getElementById('statsGrid'),

            // Level indicator
            levelIndicator: document.getElementById('levelIndicator'),
            levelNumber: document.getElementById('levelNumber'),
            levelName: document.getElementById('levelName'),
            levelDesc: document.getElementById('levelDesc'),
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText')
        };
    }

    setupEventListeners() {
        // Start game
        this.elements.startBtn.addEventListener('click', () => this.startGame());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.elements.welcomeScreen.classList.contains('hidden')) {
                this.startGame();
            }
        });

        // Settings modal
        this.elements.settingsBtn.addEventListener('click', () => this.openModal('settings'));
        this.elements.closeSettings.addEventListener('click', () => this.closeModal('settings'));

        // Stats modal
        this.elements.statsBtn.addEventListener('click', () => this.openModal('stats'));
        this.elements.closeStats.addEventListener('click', () => this.closeModal('stats'));

        // Close modals on backdrop click
        this.elements.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.elements.settingsModal) this.closeModal('settings');
        });
        this.elements.statsModal.addEventListener('click', (e) => {
            if (e.target === this.elements.statsModal) this.closeModal('stats');
        });

        // Settings toggles
        this.elements.soundToggle.addEventListener('change', (e) => {
            this.settings.soundEnabled = e.target.checked;
            audioManager.setEnabled(this.settings.soundEnabled);
            this.saveProgress();
        });

        this.elements.hintsToggle.addEventListener('change', (e) => {
            this.settings.hintsEnabled = e.target.checked;
            this.updateHintVisibility();
            this.saveProgress();
        });

        this.elements.alphabetBarToggle.addEventListener('change', (e) => {
            this.settings.alphabetBarEnabled = e.target.checked;
            this.elements.alphabetBar.style.display = e.target.checked ? 'flex' : 'none';
            this.saveProgress();
        });

        // Reset progress
        this.elements.resetProgress.addEventListener('click', () => {
            if (confirm('Tüm ilerlemeniz silinecek. Emin misiniz?')) {
                this.resetProgress();
            }
        });

        // Get code
        this.elements.getCode.addEventListener('click', () => this.showProgressCode());

        // Keyboard input for letter selection
        document.addEventListener('keydown', (e) => this.handleKeyInput(e));
    }

    initializeStats() {
        ORHUN_ALPHABET.forEach(letter => {
            if (!this.stats[letter.char]) {
                this.stats[letter.char] = {
                    correct: 0,
                    wrong: 0,
                    introduced: false
                };
            }
        });
    }

    // =========================================
    // GAME FLOW
    // =========================================

    startGame() {
        audioManager.init();
        audioManager.playStart();

        this.elements.welcomeScreen.classList.add('hidden');

        // Hide letter focus card (not needed in new design)
        if (this.elements.letterFocus) {
            this.elements.letterFocus.style.display = 'none';
        }

        // Show level indicator
        this.elements.levelIndicator.classList.add('active');

        this.renderAlphabetBar();
        this.loadLevel(this.currentLevel);
    }

    loadLevel(level, isLevelUp = false) {
        const levelInfo = getLevelInfo(level);
        if (!levelInfo) {
            this.showGameComplete();
            return;
        }

        // Mark new characters as introduced
        levelInfo.newChars.forEach(char => {
            if (this.stats[char]) {
                this.stats[char].introduced = true;
            }
            this.learnedChars.add(char);
        });

        this.currentWordIndex = 0;

        // Update level indicator with animation
        this.updateLevelIndicator(levelInfo, isLevelUp);

        this.loadWord();
        this.updateAlphabetBar();
        this.saveProgress();
    }

    loadWord() {
        const words = getWordsForLevel(this.currentLevel);
        if (this.currentWordIndex >= words.length) {
            this.levelComplete();
            return;
        }

        // Alternate mode between words for variety
        this.mode = (this.currentWordIndex % 2 === 0) ? 'orhun-to-latin' : 'latin-to-orhun';

        this.currentLetterIndex = 0;
        this.renderWord();
        this.renderAnswerGrid();
        this.updateWordDisplay();
    }

    levelComplete() {
        audioManager.playLevelComplete();

        // Check for bonus sentence in this level
        const levelInfo = getLevelInfo(this.currentLevel);
        if (levelInfo && levelInfo.bonusSentence) {
            const sentence = levelInfo.bonusSentence;
            this.showBonusSentence(sentence);
        } else {
            this.showFeedback('🎉 Seviye Tamamlandı!', 'success');
        }

        setTimeout(() => {
            this.currentLevel++;
            if (this.currentLevel <= getTotalLevels()) {
                this.loadLevel(this.currentLevel, true); // isLevelUp = true for animation
            } else {
                this.showGameComplete();
            }
        }, levelInfo && levelInfo.bonusSentence ? 4000 : 2000);
    }

    showBonusSentence(sentence) {
        // Create and show a special modal for the bonus sentence
        const modal = document.createElement('div');
        modal.className = 'bonus-sentence-modal';
        modal.innerHTML = `
            <div class="bonus-content">
                <div class="bonus-icon">📜</div>
                <div class="bonus-title">Yazıt Cümlesi</div>
                <div class="bonus-orhun">${sentence.orhun}</div>
                <div class="bonus-latin">${sentence.latin}</div>
                <div class="bonus-meaning">${sentence.meaning}</div>
            </div>
        `;
        document.body.appendChild(modal);

        // Auto remove after delay
        setTimeout(() => {
            modal.classList.add('fade-out');
            setTimeout(() => modal.remove(), 500);
        }, 3500);
    }

    showGameComplete() {
        this.showFeedback('🏆 Tebrikler! Tüm seviyeleri tamamladınız!', 'success');
    }

    updateLevelIndicator(levelInfo, isLevelUp = false) {
        // Update level info
        this.elements.levelNumber.textContent = levelInfo.level;
        this.elements.levelName.textContent = levelInfo.name;
        this.elements.levelDesc.textContent = levelInfo.description;

        // Update progress
        this.updateProgress();

        // Level up animation
        if (isLevelUp) {
            this.elements.levelIndicator.classList.add('level-up');
            this.elements.levelIndicator.querySelector('.level-badge').classList.add('level-up');

            setTimeout(() => {
                this.elements.levelIndicator.classList.remove('level-up');
                this.elements.levelIndicator.querySelector('.level-badge').classList.remove('level-up');
            }, 800);
        }
    }

    updateProgress() {
        const words = getWordsForLevel(this.currentLevel);
        const totalWords = words.length;
        const completedWords = this.currentWordIndex;
        const percentage = totalWords > 0 ? (completedWords / totalWords) * 100 : 0;

        this.elements.progressFill.style.width = `${percentage}%`;
        this.elements.progressText.textContent = `${completedWords} / ${totalWords}`;
    }

    // =========================================
    // RENDERING
    // =========================================

    renderAlphabetBar() {
        const basicAlphabet = getBasicAlphabet();
        this.elements.alphabetBar.innerHTML = basicAlphabet.map(letter => `
            <div class="letter-item" data-char="${letter.char}" title="${letter.latin}">
                ${letter.char}
            </div>
        `).join('');
    }

    updateAlphabetBar() {
        const items = this.elements.alphabetBar.querySelectorAll('.letter-item');
        items.forEach(item => {
            const char = item.dataset.char;
            item.classList.remove('learned', 'current');

            if (this.learnedChars.has(char)) {
                item.classList.add('learned');
            }

            const levelInfo = getLevelInfo(this.currentLevel);
            if (levelInfo && levelInfo.newChars.includes(char)) {
                item.classList.add('current');
            }
        });
    }

    renderWord() {
        const words = getWordsForLevel(this.currentLevel);
        const currentWord = words[this.currentWordIndex];
        const chars = [...currentWord.orhun];
        const latinChars = currentWord.latin.split('');

        // Update word meaning
        this.elements.wordMeaning.textContent = currentWord.meaning;

        // Render based on mode
        if (this.mode === 'orhun-to-latin') {
            // Question: Orhun symbols, Answer: Latin letters
            this.elements.wordQuestion.innerHTML = chars.map((char, i) =>
                `<span class="char orhun-char" data-index="${i}">${char}</span>`
            ).join('');

            // Show placeholder for answer
            this.elements.wordAnswer.innerHTML = latinChars.map((char, i) =>
                `<span class="char latin-char" data-index="${i}">?</span>`
            ).join('');

            // Update labels
            this.elements.wordQuestion.className = 'word-orhun';
            this.elements.wordAnswer.className = 'word-latin';
        } else {
            // Question: Latin letters, Answer: Orhun symbols
            this.elements.wordQuestion.innerHTML = latinChars.map((char, i) =>
                `<span class="char latin-char" data-index="${i}">${char}</span>`
            ).join('');

            // Show placeholder for answer
            this.elements.wordAnswer.innerHTML = chars.map((char, i) =>
                `<span class="char orhun-char" data-index="${i}">?</span>`
            ).join('');

            // Update labels
            this.elements.wordQuestion.className = 'word-latin';
            this.elements.wordAnswer.className = 'word-orhun';
        }
    }

    updateWordDisplay() {
        const words = getWordsForLevel(this.currentLevel);
        const currentWord = words[this.currentWordIndex];
        const chars = [...currentWord.orhun];
        const latinChars = currentWord.latin.split('');

        // Update question row highlighting
        const questionChars = this.elements.wordQuestion.querySelectorAll('.char');
        questionChars.forEach((char, i) => {
            char.classList.remove('completed', 'active');
            if (i < this.currentLetterIndex) {
                char.classList.add('completed');
            } else if (i === this.currentLetterIndex) {
                char.classList.add('active');
            }
        });

        // Update answer row - show answered letters
        const answerChars = this.elements.wordAnswer.querySelectorAll('.char');
        answerChars.forEach((char, i) => {
            char.classList.remove('completed', 'active');
            if (i < this.currentLetterIndex) {
                // Show the correct answer
                if (this.mode === 'orhun-to-latin') {
                    char.textContent = latinChars[i];
                } else {
                    char.textContent = chars[i];
                }
                char.classList.add('completed');
            } else if (i === this.currentLetterIndex) {
                char.textContent = '?';
                char.classList.add('active');
            } else {
                char.textContent = '?';
            }
        });

        // Update hint
        this.updateHintVisibility();
    }

    renderAnswerGrid() {
        const words = getWordsForLevel(this.currentLevel);
        const currentWord = words[this.currentWordIndex];
        const availableChars = getCharsUpToLevel(this.currentLevel);

        if (this.mode === 'orhun-to-latin') {
            // Get all Latin letters needed for this word
            const requiredLatinLetters = new Set(currentWord.latin.split(''));

            // Also add some distractor letters from available chars
            const allLatinLetters = new Set();
            availableChars.forEach(char => {
                const info = findLetterByChar(char);
                if (info) {
                    // Get all letters from latin representation
                    const latinParts = info.latin.split('/');
                    latinParts.forEach(part => {
                        // Add first character of each variant
                        if (part.length > 0) {
                            allLatinLetters.add(part.charAt(0).toUpperCase());
                        }
                    });
                }
            });

            // Combine required + some distractors (max 8 total)
            const combinedLetters = new Set([...requiredLatinLetters]);
            const distractors = [...allLatinLetters].filter(l => !requiredLatinLetters.has(l));
            const shuffledDistractors = distractors.sort(() => Math.random() - 0.5);

            // Add distractors until we have 6-8 options
            for (let i = 0; combinedLetters.size < 8 && i < shuffledDistractors.length; i++) {
                combinedLetters.add(shuffledDistractors[i]);
            }

            const shuffled = [...combinedLetters].sort(() => Math.random() - 0.5);

            this.elements.letterGrid.innerHTML = shuffled.map(latin => `
                <button class="grid-letter latin-answer" data-latin="${latin}">
                    ${latin}
                </button>
            `).join('');

            // Add click listeners for Latin buttons
            this.elements.letterGrid.querySelectorAll('.grid-letter').forEach(btn => {
                btn.addEventListener('click', () => this.selectLatinAnswer(btn.dataset.latin));
            });
        } else {
            // Show Orhun symbol buttons
            // Get required Orhun chars for this word
            const requiredOrhunChars = new Set([...currentWord.orhun]);

            // Combine with distractors from available chars
            const combinedChars = new Set([...requiredOrhunChars]);
            const distractors = availableChars.filter(c => !requiredOrhunChars.has(c));
            const shuffledDistractors = distractors.sort(() => Math.random() - 0.5);

            // Add distractors until we have 6-8 options
            for (let i = 0; combinedChars.size < 8 && i < shuffledDistractors.length; i++) {
                combinedChars.add(shuffledDistractors[i]);
            }

            const shuffled = [...combinedChars].sort(() => Math.random() - 0.5);

            this.elements.letterGrid.innerHTML = shuffled.map(char => {
                return `
                    <button class="grid-letter orhun-answer" data-char="${char}">
                        ${char}
                    </button>
                `;
            }).join('');

            // Add click listeners for Orhun buttons
            this.elements.letterGrid.querySelectorAll('.grid-letter').forEach(btn => {
                btn.addEventListener('click', () => this.selectOrhunAnswer(btn.dataset.char));
            });
        }
    }

    updateHintVisibility() {
        const words = getWordsForLevel(this.currentLevel);
        if (!words || !words[this.currentWordIndex]) return;

        const currentWord = words[this.currentWordIndex];
        const chars = [...currentWord.orhun];

        if (this.currentLetterIndex >= chars.length) return;

        const targetChar = chars[this.currentLetterIndex];
        const letterInfo = findLetterByChar(targetChar);

        if (this.settings.hintsEnabled && letterInfo) {
            this.elements.hintText.textContent = letterInfo.hint;
            this.elements.hintText.style.display = 'block';
        } else {
            this.elements.hintText.style.display = 'none';
        }
    }

    // =========================================
    // INPUT HANDLING
    // =========================================

    selectLatinAnswer(latin) {
        const words = getWordsForLevel(this.currentLevel);
        const currentWord = words[this.currentWordIndex];
        const latinChars = currentWord.latin.split('');
        const targetLatin = latinChars[this.currentLetterIndex].toUpperCase();

        const gridBtn = this.elements.letterGrid.querySelector(`[data-latin="${latin}"]`);

        if (latin.toUpperCase() === targetLatin) {
            this.handleCorrectAnswer(gridBtn, currentWord.orhun[this.currentLetterIndex]);
        } else {
            this.handleWrongAnswer(gridBtn);
        }
    }

    selectOrhunAnswer(char) {
        const words = getWordsForLevel(this.currentLevel);
        const currentWord = words[this.currentWordIndex];
        const chars = [...currentWord.orhun];
        const targetChar = chars[this.currentLetterIndex];

        const gridBtn = this.elements.letterGrid.querySelector(`[data-char="${char}"]`);

        if (char === targetChar) {
            this.handleCorrectAnswer(gridBtn, char);
        } else {
            this.handleWrongAnswer(gridBtn);
        }
    }

    handleCorrectAnswer(gridBtn, orhunChar) {
        audioManager.playCorrect();

        if (this.stats[orhunChar]) {
            this.stats[orhunChar].correct++;
        }

        gridBtn.classList.add('correct');
        setTimeout(() => gridBtn.classList.remove('correct'), 500);

        this.currentLetterIndex++;
        this.updateWordDisplay();

        const words = getWordsForLevel(this.currentLevel);
        const currentWord = words[this.currentWordIndex];
        const chars = [...currentWord.orhun];

        if (this.currentLetterIndex >= chars.length) {
            this.wordComplete();
        } else {
            this.showFeedback('✓ Doğru!', 'success');
        }

        this.saveProgress();
    }

    handleWrongAnswer(gridBtn) {
        audioManager.playWrong();

        gridBtn.classList.add('wrong');
        setTimeout(() => gridBtn.classList.remove('wrong'), 500);

        this.showFeedback('✗ Tekrar dene!', 'error');
        this.saveProgress();
    }

    handleKeyInput(e) {
        if (!this.elements.welcomeScreen.classList.contains('hidden')) return;
        if (this.elements.settingsModal.classList.contains('active')) return;
        if (this.elements.statsModal.classList.contains('active')) return;

        const key = e.key.toUpperCase();

        if (this.mode === 'orhun-to-latin') {
            // Check if pressed key matches any Latin button
            const btn = this.elements.letterGrid.querySelector(`[data-latin="${key}"]`);
            if (btn) {
                this.selectLatinAnswer(key);
            }
        } else {
            // Find Orhun char by Latin key
            const availableChars = getCharsUpToLevel(this.currentLevel);
            for (const char of availableChars) {
                const letterInfo = findLetterByChar(char);
                if (letterInfo && letterInfo.latin.toUpperCase().startsWith(key)) {
                    this.selectOrhunAnswer(char);
                    break;
                }
            }
        }
    }

    wordComplete() {
        audioManager.playWordComplete();
        this.showFeedback('🌟 Kelime Tamamlandı!', 'success');

        setTimeout(() => {
            this.currentWordIndex++;
            this.updateProgress(); // Update progress bar
            this.loadWord();
        }, 1500);
    }

    // =========================================
    // UI HELPERS
    // =========================================

    showFeedback(message, type = '') {
        this.elements.feedback.textContent = message;
        this.elements.feedback.className = 'feedback';
        if (type) {
            this.elements.feedback.classList.add(type);
        }

        setTimeout(() => {
            this.elements.feedback.textContent = '';
            this.elements.feedback.className = 'feedback';
        }, 1500);
    }

    openModal(modal) {
        audioManager.playClick();
        if (modal === 'settings') {
            this.elements.settingsModal.classList.add('active');
        } else if (modal === 'stats') {
            this.renderStats();
            this.elements.statsModal.classList.add('active');
        }
    }

    closeModal(modal) {
        if (modal === 'settings') {
            this.elements.settingsModal.classList.remove('active');
        } else if (modal === 'stats') {
            this.elements.statsModal.classList.remove('active');
        }
    }

    renderStats() {
        const basicAlphabet = getBasicAlphabet();

        this.elements.statsGrid.innerHTML = basicAlphabet.map(letter => {
            const stat = this.stats[letter.char] || { correct: 0, wrong: 0, introduced: false };
            const total = stat.correct + stat.wrong;
            const accuracy = total > 0 ? Math.round((stat.correct / total) * 100) : 0;

            let statusClass = '';
            if (stat.introduced) {
                statusClass = accuracy >= 80 ? 'mastered' : 'learning';
            }

            return `
                <div class="stat-item ${statusClass}">
                    <span class="stat-char">${letter.char}</span>
                    <span class="stat-value">${stat.introduced ? `${accuracy}%` : '—'}</span>
                </div>
            `;
        }).join('');
    }

    // =========================================
    // PERSISTENCE
    // =========================================

    saveProgress() {
        const data = {
            level: this.currentLevel,
            wordIndex: this.currentWordIndex,
            letterIndex: this.currentLetterIndex,
            learnedChars: [...this.learnedChars],
            stats: this.stats,
            settings: this.settings,
            savedAt: Date.now()
        };

        localStorage.setItem('orhun_progress', JSON.stringify(data));
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('orhun_progress');
            if (saved) {
                const data = JSON.parse(saved);

                this.currentLevel = data.level || 1;
                this.currentWordIndex = data.wordIndex || 0;
                this.currentLetterIndex = data.letterIndex || 0;
                this.learnedChars = new Set(data.learnedChars || []);
                this.stats = data.stats || {};

                if (data.settings) {
                    this.settings = { ...this.settings, ...data.settings };
                    this.elements.soundToggle.checked = this.settings.soundEnabled;
                    this.elements.hintsToggle.checked = this.settings.hintsEnabled;
                    this.elements.alphabetBarToggle.checked = this.settings.alphabetBarEnabled;
                    audioManager.setEnabled(this.settings.soundEnabled);

                    if (!this.settings.alphabetBarEnabled) {
                        this.elements.alphabetBar.style.display = 'none';
                    }
                }
            }
        } catch (e) {
            console.warn('Could not load saved progress:', e);
        }
    }

    resetProgress() {
        localStorage.removeItem('orhun_progress');
        this.currentLevel = 1;
        this.currentWordIndex = 0;
        this.currentLetterIndex = 0;
        this.learnedChars = new Set();
        this.initializeStats();

        this.renderAlphabetBar();
        this.loadLevel(1);
        this.closeModal('settings');

        this.showFeedback('İlerleme sıfırlandı!', 'success');
    }

    showProgressCode() {
        const data = {
            l: this.currentLevel,
            c: [...this.learnedChars],
            s: this.stats
        };

        const code = btoa(JSON.stringify(data));
        const shortCode = code.substring(0, 20) + '...';

        const input = document.createElement('textarea');
        input.value = code;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);

        alert(`İlerleme kodunuz panoya kopyalandı!\n\nKod: ${shortCode}`);
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new OrhunGame();
});

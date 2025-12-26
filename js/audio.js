/**
 * AUDIO SYSTEM
 * Web Audio API based sound effects for game feedback
 */

class AudioManager {
    constructor() {
        this.enabled = true;
        this.context = null;
        this.initialized = false;
    }

    // Initialize audio context (must be called after user interaction)
    init() {
        if (this.initialized) return;

        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API is not supported:', e);
            this.enabled = false;
        }
    }

    // Enable/disable sounds
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    // Play a simple tone
    playTone(frequency, duration, type = 'sine', volume = 0.3) {
        if (!this.enabled || !this.context) return;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);

        gainNode.gain.setValueAtTime(volume, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }

    // Play correct answer sound (ascending tone)
    playCorrect() {
        if (!this.enabled) return;
        this.init();

        // Pleasant ascending two-tone
        this.playTone(523.25, 0.1, 'sine', 0.2); // C5
        setTimeout(() => {
            this.playTone(659.25, 0.15, 'sine', 0.2); // E5
        }, 80);
    }

    // Play wrong answer sound (descending tone)
    playWrong() {
        if (!this.enabled) return;
        this.init();

        // Short buzzer-like sound
        this.playTone(200, 0.15, 'square', 0.15);
    }

    // Play word complete sound (fanfare)
    playWordComplete() {
        if (!this.enabled) return;
        this.init();

        // Ascending arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.2, 'sine', 0.2);
            }, i * 100);
        });
    }

    // Play level complete sound
    playLevelComplete() {
        if (!this.enabled) return;
        this.init();

        // Victory fanfare
        const notes = [
            { freq: 523.25, delay: 0 },
            { freq: 659.25, delay: 100 },
            { freq: 783.99, delay: 200 },
            { freq: 1046.50, delay: 300 },
            { freq: 1318.51, delay: 500 }
        ];

        notes.forEach(note => {
            setTimeout(() => {
                this.playTone(note.freq, 0.3, 'sine', 0.25);
            }, note.delay);
        });
    }

    // Play click/tap sound
    playClick() {
        if (!this.enabled) return;
        this.init();

        this.playTone(800, 0.05, 'sine', 0.1);
    }

    // Play start game sound
    playStart() {
        if (!this.enabled) return;
        this.init();

        // Whoosh-like sweep up
        const startFreq = 200;
        const endFreq = 600;
        const duration = 0.3;

        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.context.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(startFreq, this.context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(endFreq, this.context.currentTime + duration);

        gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

        oscillator.start(this.context.currentTime);
        oscillator.stop(this.context.currentTime + duration);
    }
}

// Create global audio manager instance
const audioManager = new AudioManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AudioManager, audioManager };
}

/**
 * WORD LEVELS FOR LEARNING
 * Real Turkish words with Orhun alphabet equivalents
 * Vowel harmony: Back vowels (A, I, O, U) use back consonant variants
 *                Front vowels (E, İ, Ö, Ü) use front consonant variants
 */

const WORD_LEVELS = [
    // Level 1: A, T, I - Most basic vowels and consonant
    {
        level: 1,
        name: "Başlangıç",
        description: "Temel sesler: A, I, T",
        newChars: ["𐰀", "𐰃", "𐱃", "𐱅"],
        words: [
            {
                orhun: "𐰀𐱃",
                latin: "AT",
                meaning: "At (hayvan)",
                image: "horse"
            },
            {
                orhun: "𐰀𐱃𐰀",
                latin: "ATA",
                meaning: "Ata, dede, cet",
                image: "ancestor"
            },
            {
                orhun: "𐰃𐱅",
                latin: "İT",
                meaning: "Köpek",
                image: "dog"
            }
        ]
    },

    // Level 2: Adding R, K
    {
        level: 2,
        name: "İlerleyiş",
        description: "Yeni sesler: R, K",
        newChars: ["𐰺", "𐰴"],
        words: [
            {
                orhun: "𐰴𐰀𐱃",
                latin: "KAT",
                meaning: "Kat, tabaka",
                image: "layer"
            },
            {
                orhun: "𐰀𐰴",
                latin: "AK",
                meaning: "Beyaz, temiz",
                image: "white"
            },
            {
                orhun: "𐰀𐰺𐱃",
                latin: "ART",
                meaning: "Arka, arkası",
                image: "back"
            }
        ]
    },

    // Level 3: Adding O/U, L
    {
        level: 3,
        name: "Genişleme",
        description: "Yeni sesler: O/U, L",
        newChars: ["𐰆", "𐰞"],
        words: [
            {
                orhun: "𐰆𐰞",
                latin: "OL",
                meaning: "Ol, var ol",
                image: "exist"
            },
            {
                orhun: "𐰆𐱃",
                latin: "OT",
                meaning: "Ot, çimen",
                image: "grass"
            },
            {
                orhun: "𐰴𐰆𐰞",
                latin: "KOL",
                meaning: "Kol, uzuv",
                image: "arm"
            },
            {
                orhun: "𐰀𐰞𐱃",
                latin: "ALT",
                meaning: "Aşağı, alt taraf",
                image: "down"
            }
        ]
    },

    // Level 4: Adding N, S, Ş
    {
        level: 4,
        name: "Büyüme",
        description: "Yeni sesler: N, S, Ş",
        newChars: ["𐰣", "𐰽", "𐱁"],
        words: [
            {
                orhun: "𐰽𐰆𐰣",
                latin: "SON",
                meaning: "Son, bitiş",
                image: "end"
            },
            {
                orhun: "𐱃𐰀𐰣",
                latin: "TAN",
                meaning: "Şafak, tan vakti",
                image: "dawn"
            },
            {
                orhun: "𐰀𐰽",
                latin: "AS",
                meaning: "Asmak, asıl",
                image: "hang"
            },
            {
                orhun: "𐱃𐰀𐱁",
                latin: "TAŞ",
                meaning: "Kaya, taş",
                image: "stone"
            }
        ]
    },

    // Level 5: Adding Ö/Ü, B
    {
        level: 5,
        name: "Derinleşme",
        description: "Yeni sesler: Ö/Ü, B",
        newChars: ["𐰇", "𐰉", "𐰋", "𐰠"],
        words: [
            {
                orhun: "𐰉𐰀𐱁",
                latin: "BAŞ",
                meaning: "Baş, kafa",
                image: "head"
            },
            {
                orhun: "𐰉𐰀𐱃",
                latin: "BAT",
                meaning: "Batmak, gün batımı",
                image: "sunset"
            },
            {
                orhun: "𐰇𐰠",
                latin: "ÖL",
                meaning: "Ölmek",
                image: "death"
            },
            {
                orhun: "𐰉𐰆",
                latin: "BO",
                meaning: "Bu, işaret (eski Türkçe)",
                image: "this"
            }
        ]
    },

    // Level 6: Adding G, M
    {
        level: 6,
        name: "Gelişim",
        description: "Yeni sesler: G, M",
        newChars: ["𐰏", "𐰢", "𐰚"],
        words: [
            {
                orhun: "𐱃𐰀𐰢",
                latin: "TAM",
                meaning: "Tam, eksiksiz",
                image: "complete"
            },
            {
                orhun: "𐰏𐰇𐰚",
                latin: "GÖK",
                meaning: "Gökyüzü",
                image: "sky"
            },
            {
                orhun: "𐰽𐰆𐰢",
                latin: "SOM",
                meaning: "Som, katı altın",
                image: "gold"
            }
        ]
    },

    // Level 7: Historical Words - TÜRK
    {
        level: 7,
        name: "Tarih",
        description: "Tarihi Türk kelimeleri",
        newChars: ["𐰼", "𐰭", "𐰜"],
        bonusSentence: {
            orhun: "𐱅𐰇𐰼𐰜 𐰉𐰆𐰑𐰣",
            latin: "TÜRK BODUN",
            meaning: "Türk Milleti"
        },
        words: [
            {
                orhun: "𐱅𐰇𐰼𐰜",
                latin: "TÜRK",
                meaning: "Türk milleti - Orhun Yazıtları'ndan",
                image: "turk"
            },
            {
                orhun: "𐱅𐰭𐰼𐰃",
                latin: "TENGRİ",
                meaning: "Tengri, Tanrı",
                image: "tengri"
            },
            {
                orhun: "𐰴𐰀𐰍𐰀𐰣",
                latin: "KAĞAN",
                meaning: "Kağan, hükümdar",
                image: "kagan"
            },
            {
                orhun: "𐰋𐰃𐰠𐰏𐰀",
                latin: "BİLGE",
                meaning: "Bilge, bilgin",
                image: "wise"
            }
        ]
    },

    // Level 8: İyelik Eki +m (Possession - 1st person)
    {
        level: 8,
        name: "İyelik",
        description: "'+m' iyelik eki: benim anlamı katar",
        newChars: ["𐰑", "𐰖"],
        grammarNote: "+m eki, kelimenin 1. şahsa ait olduğunu gösterir: AT → ATIM (benim atım)",
        words: [
            {
                orhun: "𐰀𐱃𐰃𐰢",
                latin: "ATIM",
                meaning: "Atım (benim atım)",
                image: "horse",
                root: "AT",
                suffix: "+IM"
            },
            {
                orhun: "𐰴𐰀𐰍𐰀𐰣𐰃𐰢",
                latin: "KAĞANIM",
                meaning: "Kağanım (benim kağanım)",
                image: "kagan",
                root: "KAĞAN",
                suffix: "+IM"
            },
            {
                orhun: "𐰉𐰆𐰑𐰣𐰃𐰢",
                latin: "BODUNUM",
                meaning: "Milletim (benim milletim)",
                image: "people",
                root: "BODUN",
                suffix: "+UM"
            },
            {
                orhun: "𐰋𐰃𐰠𐰏𐰀𐰢",
                latin: "BİLGEM",
                meaning: "Bilgem (benim bilgim)",
                image: "wise",
                root: "BİLGE",
                suffix: "+M"
            }
        ]
    },

    // Level 9: Sahiplik Eki +lXg (Having/With)
    {
        level: 9,
        name: "Sahiplik",
        description: "'+lXg' sahiplik eki: -lı/-li anlamı katar",
        newChars: [],
        grammarNote: "+lXg eki, bir şeye sahip olma anlamı katar: AT → ATLIG (atlı, at sahibi)",
        bonusSentence: {
            orhun: "𐰋𐰃𐰠𐰏𐰀 𐰴𐰀𐰍𐰀𐰣",
            latin: "BİLGE KAĞAN",
            meaning: "Bilge Kağan"
        },
        words: [
            {
                orhun: "𐰀𐱃𐰞𐰃𐰍",
                latin: "ATLIG",
                meaning: "Atlı, süvari",
                image: "horse",
                root: "AT",
                suffix: "+LIG"
            },
            {
                orhun: "𐰉𐰀𐱁𐰞𐰃𐰍",
                latin: "BAŞLIG",
                meaning: "Başlı, lideri olan",
                image: "head",
                root: "BAŞ",
                suffix: "+LIG"
            },
            {
                orhun: "𐰴𐰆𐱃𐰞𐰆𐰍",
                latin: "KUTLUG",
                meaning: "Kutlu, mübarek",
                image: "blessing",
                root: "KUT",
                suffix: "+LUG"
            },
            {
                orhun: "𐱃𐰆𐰣𐰞𐰆𐰍",
                latin: "TONLUG",
                meaning: "Elbiseli, giyimli",
                image: "clothes",
                root: "TON",
                suffix: "+LUG"
            }
        ]
    },

    // Level 10: Yokluk Eki +sXz (Without/Lacking)
    {
        level: 10,
        name: "Yokluk",
        description: "'+sXz' yokluk eki: -sız/-siz anlamı katar",
        newChars: [],
        grammarNote: "+sXz eki, bir şeye sahip olmama anlamı katar: YOL → YOLSUZ (yolsuz)",
        words: [
            {
                orhun: "𐰖𐰆𐰞𐰽𐰆𐰔",
                latin: "YOLSUZ",
                meaning: "Yolsuz, yolu olmayan",
                image: "lost",
                root: "YOL",
                suffix: "+SUZ"
            },
            {
                orhun: "𐱃𐰆𐰣𐰽𐰆𐰔",
                latin: "TONSUZ",
                meaning: "Elbisesiz, çıplak",
                image: "naked",
                root: "TON",
                suffix: "+SUZ"
            },
            {
                orhun: "𐰋𐰃𐰠𐰏𐰀𐰾𐰃𐰔",
                latin: "BİLGESİZ",
                meaning: "Bilgesiz, cahil",
                image: "ignorant",
                root: "BİLGE",
                suffix: "+SİZ"
            },
            {
                orhun: "𐰴𐰀𐰍𐰀𐰣𐰽𐰃𐰔",
                latin: "KAĞANSIZ",
                meaning: "Kağansız, hükümdarsız",
                image: "leaderless",
                root: "KAĞAN",
                suffix: "+SIZ"
            }
        ]
    },

    // Level 11: Meslek Eki +çI (Profession/Agent)
    {
        level: 11,
        name: "Meslek",
        description: "'+çI' meslek eki: -cı/-ci anlamı katar",
        newChars: [],
        grammarNote: "+çI eki, o işle uğraşan kişi anlamı katar: YAGI → YAGIÇI (savaşçı)",
        bonusSentence: {
            orhun: "𐱅𐰭𐰼𐰃 𐱅𐰩 𐱅𐰇𐰼𐰜 𐰋𐰃𐰠𐰏𐰀 𐰴𐰀𐰍𐰀𐰣",
            latin: "TENGRİ TEG TÜRK BİLGE KAĞAN",
            meaning: "Tanrı gibi Türk Bilge Kağan"
        },
        words: [
            {
                orhun: "𐰖𐰀𐰍𐰃𐰲𐰃",
                latin: "YAGIÇI",
                meaning: "Savaşçı, düşmanla savaşan",
                image: "warrior",
                root: "YAGI",
                suffix: "+ÇI"
            },
            {
                orhun: "𐰖𐰃𐰺𐰲𐰃",
                latin: "YIRÇI",
                meaning: "Kılavuz, yol gösteren",
                image: "guide",
                root: "YIR",
                suffix: "+ÇI"
            },
            {
                orhun: "𐰉𐰃𐱃𐰃𐰏𐰲𐰃",
                latin: "BİTİGÇİ",
                meaning: "Yazıcı, katip",
                image: "scribe",
                root: "BİTİG",
                suffix: "+Çİ"
            },
            {
                orhun: "𐰀𐰞𐰯𐰲𐰃",
                latin: "ALPÇI",
                meaning: "Alp, kahraman savaşçı",
                image: "hero",
                root: "ALP",
                suffix: "+ÇI"
            }
        ]
    }
];

// Get words for a specific level
function getWordsForLevel(level) {
    const levelData = WORD_LEVELS.find(l => l.level === level);
    return levelData ? levelData.words : [];
}

// Get all characters introduced up to a level
function getCharsUpToLevel(level) {
    const chars = [];
    WORD_LEVELS.forEach(l => {
        if (l.level <= level) {
            chars.push(...l.newChars);
        }
    });
    return chars;
}

// Get level info
function getLevelInfo(level) {
    return WORD_LEVELS.find(l => l.level === level);
}

// Get total number of levels
function getTotalLevels() {
    return WORD_LEVELS.length;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WORD_LEVELS, getWordsForLevel, getCharsUpToLevel, getLevelInfo, getTotalLevels };
}

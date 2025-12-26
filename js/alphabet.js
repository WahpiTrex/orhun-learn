/**
 * ORHUN ALPHABET DATA
 * Complete Orhun (Old Turkic/Göktürk) alphabet with Unicode characters
 * Reference: turkbitig.com and verified against standard charts
 */

const ORHUN_ALPHABET = [
    // ==========================================
    // VOWELS (Ünlüler) - 4 harf, 8 sesi karşılar
    // ==========================================
    {
        char: "𐰀",
        unicode: "10C00",
        latin: "A/E",
        sound: "a",
        hint: "Kalın ünsüzlerle A, ince ünsüzlerle E sesi verir",
        type: "vowel"
    },
    {
        char: "𐰃",
        unicode: "10C03",
        latin: "I/İ",
        sound: "i",
        hint: "Kalın ünsüzlerle I, ince ünsüzlerle İ sesi verir",
        type: "vowel"
    },
    {
        char: "𐰆",
        unicode: "10C06",
        latin: "O/U",
        sound: "o",
        hint: "İlk hecede O, sonraki hecelerde U sesi verir",
        type: "vowel"
    },
    {
        char: "𐰇",
        unicode: "10C07",
        latin: "Ö/Ü",
        sound: "ö",
        hint: "İlk hecede Ö, sonraki hecelerde Ü sesi verir",
        type: "vowel"
    },

    // ==========================================
    // KUTUPLU ÜNSÜZLER (Polar Consonants)
    // Kalın (Back vowel) / İnce (Front vowel)
    // ==========================================

    // B
    {
        char: "𐰉",
        unicode: "10C09",
        latin: "AB/B",
        sound: "b",
        hint: "Kalın heceli B sesi",
        type: "consonant",
        variant: "back"
    },
    {
        char: "𐰋",
        unicode: "10C0B",
        latin: "EB/B",
        sound: "b",
        hint: "İnce heceli B sesi",
        type: "consonant",
        variant: "front"
    },

    // D
    {
        char: "𐰑",
        unicode: "10C11",
        latin: "AD/D",
        sound: "d",
        hint: "Kalın heceli D sesi",
        type: "consonant",
        variant: "back"
    },
    {
        char: "𐰓",
        unicode: "10C13",
        latin: "ED/D",
        sound: "d",
        hint: "İnce heceli D sesi",
        type: "consonant",
        variant: "front"
    },

    // G
    {
        char: "𐰍",
        unicode: "10C0D",
        latin: "AG/Ğ",
        sound: "g",
        hint: "Kalın G/Ğ sesi",
        type: "consonant",
        variant: "back"
    },
    {
        char: "𐰏",
        unicode: "10C0F",
        latin: "EG/G",
        sound: "g",
        hint: "İnce G sesi",
        type: "consonant",
        variant: "front"
    },

    // K
    {
        char: "𐰴",
        unicode: "10C34",
        latin: "AQ/K",
        sound: "k",
        hint: "Kalın K (Kaf) sesi",
        type: "consonant",
        variant: "back"
    },
    {
        char: "𐰚",
        unicode: "10C1A",
        latin: "EK/K",
        sound: "k",
        hint: "İnce K sesi",
        type: "consonant",
        variant: "front"
    },

    // L
    {
        char: "𐰞",
        unicode: "10C1E",
        latin: "AL/L",
        sound: "l",
        hint: "Kalın L sesi",
        type: "consonant",
        variant: "back"
    },
    {
        char: "𐰠",
        unicode: "10C20",
        latin: "EL/L",
        sound: "l",
        hint: "İnce L sesi",
        type: "consonant",
        variant: "front"
    },

    // N
    {
        char: "𐰣",
        unicode: "10C23",
        latin: "AN/N",
        sound: "n",
        hint: "Kalın N sesi",
        type: "consonant",
        variant: "back"
    },
    {
        char: "𐰤",
        unicode: "10C24",
        latin: "EN/N",
        sound: "n",
        hint: "İnce N sesi",
        type: "consonant",
        variant: "front"
    },

    // R
    {
        char: "𐰺",
        unicode: "10C3A",
        latin: "AR/R",
        sound: "r",
        hint: "Kalın R sesi",
        type: "consonant",
        variant: "back"
    },
    {
        char: "𐰼",
        unicode: "10C3C",
        latin: "ER/R",
        sound: "r",
        hint: "İnce R sesi",
        type: "consonant",
        variant: "front"
    },

    // S
    {
        char: "𐰽",
        unicode: "10C3D",
        latin: "AS/S",
        sound: "s",
        hint: "Kalın S sesi",
        type: "consonant",
        variant: "back"
    },
    {
        char: "𐰾",
        unicode: "10C3E",
        latin: "ES/S",
        sound: "s",
        hint: "İnce S sesi",
        type: "consonant",
        variant: "front"
    },

    // T
    {
        char: "𐱃",
        unicode: "10C43",
        latin: "AT/T",
        sound: "t",
        hint: "Kalın T sesi - daire içinde çarpı",
        type: "consonant",
        variant: "back"
    },
    {
        char: "𐱅",
        unicode: "10C45",
        latin: "ET/T",
        sound: "t",
        hint: "İnce T sesi - h şeklinde",
        type: "consonant",
        variant: "front"
    },

    // Y
    {
        char: "𐰖",
        unicode: "10C16",
        latin: "AY/Y",
        sound: "y",
        hint: "Kalın Y sesi - D harfi gibi",
        type: "consonant",
        variant: "back"
    },
    {
        char: "𐰘",
        unicode: "10C18",
        latin: "EY/Y",
        sound: "y",
        hint: "İnce Y sesi - 9 rakamı gibi",
        type: "consonant",
        variant: "front"
    },

    // ==========================================
    // KUTUPSUZ ÜNSÜZLER (Non-polar Consonants)
    // Tüm ünlüler ile hece kurabilirler
    // ==========================================
    {
        char: "𐰲",
        unicode: "10C32",
        latin: "Ç",
        sound: "ç",
        hint: "Ç sesi - kalın-ince ayrımı yok, tüm ünlülerle kullanılır",
        type: "consonant"
    },
    {
        char: "𐰢",
        unicode: "10C22",
        latin: "M",
        sound: "m",
        hint: "M sesi - kalın-ince ayrımı yok, tüm ünlülerle kullanılır",
        type: "consonant"
    },
    {
        char: "𐰯",
        unicode: "10C2F",
        latin: "P",
        sound: "p",
        hint: "P sesi - kalın-ince ayrımı yok, tüm ünlülerle kullanılır",
        type: "consonant"
    },
    {
        char: "𐱁",
        unicode: "10C41",
        latin: "Ş",
        sound: "ş",
        hint: "Ş sesi - kalın-ince ayrımı yok, tüm ünlülerle kullanılır",
        type: "consonant"
    },
    {
        char: "𐰔",
        unicode: "10C14",
        latin: "Z",
        sound: "z",
        hint: "Z sesi - kalın-ince ayrımı yok, tüm ünlülerle kullanılır",
        type: "consonant"
    },

    // ==========================================
    // ÇİFT SESLİ HARFLER (Compound Letters)
    // ==========================================
    {
        char: "𐰨",
        unicode: "10C28",
        latin: "NÇ",
        sound: "nç",
        hint: "NÇ birleşik sesi verir",
        type: "compound"
    },
    {
        char: "𐰦",
        unicode: "10C26",
        latin: "ND/NT",
        sound: "nt",
        hint: "ND veya NT birleşik sesi verir",
        type: "compound"
    },
    {
        char: "𐰡",
        unicode: "10C21",
        latin: "LD/LT",
        sound: "lt",
        hint: "LD veya LT birleşik sesi verir",
        type: "compound"
    },
    {
        char: "𐰭",
        unicode: "10C2D",
        latin: "NG/Ñ",
        sound: "ng",
        hint: "NG (genizden) sesi verir - TeÑRİ (Tanrı)",
        type: "compound"
    },
    {
        char: "𐰪",
        unicode: "10C2A",
        latin: "NY/Ñ",
        sound: "ny",
        hint: "NY birleşik sesi verir",
        type: "compound"
    },

    // ==========================================
    // HECE HARFLERİ (Syllable Letters)
    // ==========================================
    {
        char: "𐰱",
        unicode: "10C31",
        latin: "İÇ",
        sound: "iç",
        hint: "Sadece 'iç' yazarken kullanılır",
        type: "syllable"
    },
    {
        char: "𐰶",
        unicode: "10C36",
        latin: "IK/KI",
        sound: "ık",
        hint: "'ık, kı' heceleri yazarken kullanılır",
        type: "syllable"
    },
    {
        char: "𐰸",
        unicode: "10C38",
        latin: "OK/UK/KO/KU",
        sound: "ok",
        hint: "'ok, uk, ko, ku' heceleri yazarken kullanılır",
        type: "syllable"
    },
    {
        char: "𐰜",
        unicode: "10C1C",
        latin: "ÖK/ÜK/KÖ/KÜ",
        sound: "ök",
        hint: "'ök, ük, kö, kü' heceleri yazarken kullanılır",
        type: "syllable"
    }
];

// Get all letters for the alphabet bar (excluding special characters)
function getBasicAlphabet() {
    return ORHUN_ALPHABET.filter(letter =>
        letter.type === 'vowel' ||
        letter.type === 'consonant' ||
        letter.type === 'compound'
    );
}

// Find letter by character
function findLetterByChar(char) {
    return ORHUN_ALPHABET.find(letter => letter.char === char);
}

// Find letter by latin equivalent
function findLetterByLatin(latin) {
    return ORHUN_ALPHABET.find(letter =>
        letter.latin.toLowerCase().includes(latin.toLowerCase())
    );
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ORHUN_ALPHABET, getBasicAlphabet, findLetterByChar, findLetterByLatin };
}

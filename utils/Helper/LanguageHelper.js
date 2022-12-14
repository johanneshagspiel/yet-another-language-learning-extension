function getSupportedLanguageDic() {
    let translations = {
        "PONS": {
            "ar": ["en", "de"],
            "bg": ["en", "de"],
            "zh": ["en", "de", "fr", "es"],
            "hr": ["de"],
            "cs": ["de"],
            "da": ["de"],
            "nl": ["de"],
            "en": ["de", "bg", "zh", "fr", "de", "it", "pl", "pt", "ru", "sr", "sl", "es"],
            "fi": ["de"],
            "fr": ["cs", "en", "de", "it", "pl", "sl", "es"],
            "de": ["ar", "bg", "zh", "hr", "cs", "da", "nl", "en", "fi", "fr", "el", "hu", "is", "it", "ja", "la", "no",
                "fa", "pl", "pt", "ro", "ru", "sr", "sk", "sl", "es", "tr"],
            "el": ["de"],
            "hu": ["de"],
            "it": ["en", "fr", "de", "pl", "sl", "es"],
            "ja": ["de"],
            "la": ["de"],
            "no": ["de"],
            "fa": ["de"],
            "pl": ["en", "fr", "de", "it", "ru", "es"],
            "pt": ["en", "de", "es"],
            "ro": ["de"],
            "ru": ["en", "de", "pt"],
            "sk": ["de"],
            "sl": ["en", "fr", "de", "it", "es"],
            "es": ["zh", "en", "fr", "de", "it", "pl", "pt", "sl"],
            "sv": ["de"],
            "tr": ["de"]
        }
    }
    return translations;
}

function getCorrectLanguageConnection(inputMapping) {

    const languageMapping = {
        "elde": "deel",
        "deel": "deel",
        "ende": "deen",
        "deen": "deen",
        "frde": "defr",
        "defr": "defr",
        "esde": "dees",
        "dees": "dees",
        "rude": "deru",
        "deru": "deru",
        "plde": "depl",
        "depl": "depl",
        "itde": "deit",
        "deit": "deit",
        "ptde": "dept",
        "dept": "dept",
        "trde": "detr",
        "detr": "detr",
        "dela": "dela",
        "lade": "dela",
        "desl": "desl",
        "slde": "desl",
        "esen": "enes",
        "enes": "enes",
        "fren": "enfr",
        "enfr": "enfr",
        "plen": "enpl",
        "enpl": "enpl",
        "slen": "ensl",
        "ensl": "ensl",
        "espl": "espl",
        "ples": "espl",
        "frpl": "frpl",
        "plfr": "frpl",
        "itpl": "itpl",
        "plit": "itpl",
        "rupl": "plru",
        "plru": "plru",
        "essl": "essl",
        "sles": "essl",
        "frsl": "frsl",
        "slfr": "frsl",
        "itsl": "itsl",
        "slit": "itsl",
        "enit": "enit",
        "iten": "enit",
        "enpt": "enpt",
        "pten": "enpt",
        "enru": "enru",
        "ruen": "enru",
        "espt": "espt",
        "ptes": "espt",
        "esfr": "esfr",
        "fres": "esfr",
        "delb": "delb",
        "lbde": "delb",
        "dezh": "dezh",
        "zhde": "dezh",
        "enzh": "enzh",
        "zhen": "enzh",
        "eszh": "eszh",
        "zhes": "eszh",
        "frzh": "frzh",
        "zhfr": "frzh",
        "denl": "denl",
        "nlde": "denl",
        "arde": "arde",
        "dear": "arde",
        "defa": "defa",
        "fade": "defa",
        "defi": "defi",
        "fide": "defi",
        "dehr": "dehr",
        "hrde": "dehr",
        "deja": "deja",
        "jade": "deja",
        "dero": "dero",
        "rode": "dero",
        "desk": "desk",
        "skde": "desk",
        "esit": "esit",
        "ites": "esit",
        "frit": "frit",
        "itfr": "frit",
        "bgde": "bgde",
        "debg": "bgde",
        "bgen": "bgen",
        "enbg": "bgen",
        "dade": "dade",
        "deda": "dade",
        "csde": "csde",
        "decs": "csde",
        "dehu": "dehu",
        "hude": "dehu",
        "deno": "deno",
        "node": "deno",
        "desv": "desv",
        "svde": "desv",
        "deis": "deis",
        "isde": "deis",
        "desr": "desr",
        "srde": "desr",
        "ensr": "ensr",
        "sren": "ensr",
        "dede": "dede",
        "dedx": "dedx"
    }
    if (inputMapping in languageMapping) {
        return languageMapping[inputMapping]
    } else {
        return "dictionary_not_found"
    }
}

function getLanguageFromCode(countryCode) {

    const countryCodeType = typeof countryCode
    if (countryCodeType === "string") {

        const languageDic = getLanguageCodeDic();
        return languageDic[countryCode]["name"];
    }
}

function getCountryCodeFromLanguage(language) {
    const languageDic = getLanguageCodeDic();
    const fullLanguageDic = {}

    for (const [key, value] of Object.entries(languageDic)) {
        fullLanguageDic[String(value["name"]).split(",")[0].split(";")[0]] = key;
    }
    return fullLanguageDic[language];
}

function getLanguageCodeDic() {
    /**
     * @author Phil Teare
     * using wikipedia data
     */
    let isoLangs = {
        "ab":{
            "name":"Abkhaz",
            "nativeName":"??????????"
        },
        "aa":{
            "name":"Afar",
            "nativeName":"Afaraf"
        },
        "af":{
            "name":"Afrikaans",
            "nativeName":"Afrikaans"
        },
        "ak":{
            "name":"Akan",
            "nativeName":"Akan"
        },
        "sq":{
            "name":"Albanian",
            "nativeName":"Shqip"
        },
        "am":{
            "name":"Amharic",
            "nativeName":"????????????"
        },
        "ar":{
            "name":"Arabic",
            "nativeName":"??????????????"
        },
        "an":{
            "name":"Aragonese",
            "nativeName":"Aragon??s"
        },
        "hy":{
            "name":"Armenian",
            "nativeName":"??????????????"
        },
        "as":{
            "name":"Assamese",
            "nativeName":"?????????????????????"
        },
        "av":{
            "name":"Avaric",
            "nativeName":"???????? ????????, ???????????????? ????????"
        },
        "ae":{
            "name":"Avestan",
            "nativeName":"avesta"
        },
        "ay":{
            "name":"Aymara",
            "nativeName":"aymar aru"
        },
        "az":{
            "name":"Azerbaijani",
            "nativeName":"az??rbaycan dili"
        },
        "bm":{
            "name":"Bambara",
            "nativeName":"bamanankan"
        },
        "ba":{
            "name":"Bashkir",
            "nativeName":"?????????????? ????????"
        },
        "eu":{
            "name":"Basque",
            "nativeName":"euskara, euskera"
        },
        "be":{
            "name":"Belarusian",
            "nativeName":"????????????????????"
        },
        "bn":{
            "name":"Bengali",
            "nativeName":"???????????????"
        },
        "bh":{
            "name":"Bihari",
            "nativeName":"?????????????????????"
        },
        "bi":{
            "name":"Bislama",
            "nativeName":"Bislama"
        },
        "bs":{
            "name":"Bosnian",
            "nativeName":"bosanski jezik"
        },
        "br":{
            "name":"Breton",
            "nativeName":"brezhoneg"
        },
        "bg":{
            "name":"Bulgarian",
            "nativeName":"?????????????????? ????????"
        },
        "my":{
            "name":"Burmese",
            "nativeName":"???????????????"
        },
        "ca":{
            "name":"Catalan; Valencian",
            "nativeName":"Catal??"
        },
        "ch":{
            "name":"Chamorro",
            "nativeName":"Chamoru"
        },
        "ce":{
            "name":"Chechen",
            "nativeName":"?????????????? ????????"
        },
        "ny":{
            "name":"Chichewa; Chewa; Nyanja",
            "nativeName":"chiChe??a, chinyanja"
        },
        "zh":{
            "name":"Chinese",
            "nativeName":"?????? (Zh??ngw??n), ??????, ??????"
        },
        "cv":{
            "name":"Chuvash",
            "nativeName":"?????????? ??????????"
        },
        "kw":{
            "name":"Cornish",
            "nativeName":"Kernewek"
        },
        "co":{
            "name":"Corsican",
            "nativeName":"corsu, lingua corsa"
        },
        "cr":{
            "name":"Cree",
            "nativeName":"?????????????????????"
        },
        "hr":{
            "name":"Croatian",
            "nativeName":"hrvatski"
        },
        "cs":{
            "name":"Czech",
            "nativeName":"??esky, ??e??tina"
        },
        "da":{
            "name":"Danish",
            "nativeName":"dansk"
        },
        "dv":{
            "name":"Divehi; Dhivehi; Maldivian;",
            "nativeName":"????????????"
        },
        "nl":{
            "name":"Dutch",
            "nativeName":"Nederlands, Vlaams"
        },
        "en":{
            "name":"English",
            "nativeName":"English"
        },
        "eo":{
            "name":"Esperanto",
            "nativeName":"Esperanto"
        },
        "et":{
            "name":"Estonian",
            "nativeName":"eesti, eesti keel"
        },
        "ee":{
            "name":"Ewe",
            "nativeName":"E??egbe"
        },
        "fo":{
            "name":"Faroese",
            "nativeName":"f??royskt"
        },
        "fj":{
            "name":"Fijian",
            "nativeName":"vosa Vakaviti"
        },
        "fi":{
            "name":"Finnish",
            "nativeName":"suomi, suomen kieli"
        },
        "fr":{
            "name":"French",
            "nativeName":"fran??ais, langue fran??aise"
        },
        "ff":{
            "name":"Fula; Fulah; Pulaar; Pular",
            "nativeName":"Fulfulde, Pulaar, Pular"
        },
        "gl":{
            "name":"Galician",
            "nativeName":"Galego"
        },
        "ka":{
            "name":"Georgian",
            "nativeName":"?????????????????????"
        },
        "de":{
            "name":"German",
            "nativeName":"Deutsch"
        },
        "el":{
            "name":"Greek, Modern",
            "nativeName":"????????????????"
        },
        "gn":{
            "name":"Guaran??",
            "nativeName":"Ava??e???"
        },
        "gu":{
            "name":"Gujarati",
            "nativeName":"?????????????????????"
        },
        "ht":{
            "name":"Haitian; Haitian Creole",
            "nativeName":"Krey??l ayisyen"
        },
        "ha":{
            "name":"Hausa",
            "nativeName":"Hausa, ????????????"
        },
        "he":{
            "name":"Hebrew (modern)",
            "nativeName":"??????????"
        },
        "hz":{
            "name":"Herero",
            "nativeName":"Otjiherero"
        },
        "hi":{
            "name":"Hindi",
            "nativeName":"??????????????????, ???????????????"
        },
        "ho":{
            "name":"Hiri Motu",
            "nativeName":"Hiri Motu"
        },
        "hu":{
            "name":"Hungarian",
            "nativeName":"Magyar"
        },
        "ia":{
            "name":"Interlingua",
            "nativeName":"Interlingua"
        },
        "id":{
            "name":"Indonesian",
            "nativeName":"Bahasa Indonesia"
        },
        "ie":{
            "name":"Interlingue",
            "nativeName":"Originally called Occidental; then Interlingue after WWII"
        },
        "ga":{
            "name":"Irish",
            "nativeName":"Gaeilge"
        },
        "ig":{
            "name":"Igbo",
            "nativeName":"As???s??? Igbo"
        },
        "ik":{
            "name":"Inupiaq",
            "nativeName":"I??upiaq, I??upiatun"
        },
        "io":{
            "name":"Ido",
            "nativeName":"Ido"
        },
        "is":{
            "name":"Icelandic",
            "nativeName":"??slenska"
        },
        "it":{
            "name":"Italian",
            "nativeName":"Italiano"
        },
        "iu":{
            "name":"Inuktitut",
            "nativeName":"??????????????????"
        },
        "ja":{
            "name":"Japanese",
            "nativeName":"????????? (??????????????????????????????)"
        },
        "jv":{
            "name":"Javanese",
            "nativeName":"basa Jawa"
        },
        "kl":{
            "name":"Kalaallisut, Greenlandic",
            "nativeName":"kalaallisut, kalaallit oqaasii"
        },
        "kn":{
            "name":"Kannada",
            "nativeName":"???????????????"
        },
        "kr":{
            "name":"Kanuri",
            "nativeName":"Kanuri"
        },
        "ks":{
            "name":"Kashmiri",
            "nativeName":"?????????????????????, ???????????????"
        },
        "kk":{
            "name":"Kazakh",
            "nativeName":"?????????? ????????"
        },
        "km":{
            "name":"Khmer",
            "nativeName":"???????????????????????????"
        },
        "ki":{
            "name":"Kikuyu, Gikuyu",
            "nativeName":"G??k??y??"
        },
        "rw":{
            "name":"Kinyarwanda",
            "nativeName":"Ikinyarwanda"
        },
        "ky":{
            "name":"Kirghiz, Kyrgyz",
            "nativeName":"???????????? ????????"
        },
        "kv":{
            "name":"Komi",
            "nativeName":"???????? ??????"
        },
        "kg":{
            "name":"Kongo",
            "nativeName":"KiKongo"
        },
        "ko":{
            "name":"Korean",
            "nativeName":"????????? (?????????), ????????? (?????????)"
        },
        "ku":{
            "name":"Kurdish",
            "nativeName":"Kurd??, ?????????????"
        },
        "kj":{
            "name":"Kwanyama, Kuanyama",
            "nativeName":"Kuanyama"
        },
        "la":{
            "name":"Latin",
            "nativeName":"latine, lingua latina"
        },
        "lb":{
            "name":"Luxembourgish, Letzeburgesch",
            "nativeName":"L??tzebuergesch"
        },
        "lg":{
            "name":"Luganda",
            "nativeName":"Luganda"
        },
        "li":{
            "name":"Limburgish, Limburgan, Limburger",
            "nativeName":"Limburgs"
        },
        "ln":{
            "name":"Lingala",
            "nativeName":"Ling??la"
        },
        "lo":{
            "name":"Lao",
            "nativeName":"?????????????????????"
        },
        "lt":{
            "name":"Lithuanian",
            "nativeName":"lietuvi?? kalba"
        },
        "lu":{
            "name":"Luba-Katanga",
            "nativeName":""
        },
        "lv":{
            "name":"Latvian",
            "nativeName":"latvie??u valoda"
        },
        "gv":{
            "name":"Manx",
            "nativeName":"Gaelg, Gailck"
        },
        "mk":{
            "name":"Macedonian",
            "nativeName":"???????????????????? ??????????"
        },
        "mg":{
            "name":"Malagasy",
            "nativeName":"Malagasy fiteny"
        },
        "ms":{
            "name":"Malay",
            "nativeName":"bahasa Melayu, ???????? ?????????????"
        },
        "ml":{
            "name":"Malayalam",
            "nativeName":"??????????????????"
        },
        "mt":{
            "name":"Maltese",
            "nativeName":"Malti"
        },
        "mi":{
            "name":"M??ori",
            "nativeName":"te reo M??ori"
        },
        "mr":{
            "name":"Marathi (Mar?????h??)",
            "nativeName":"???????????????"
        },
        "mh":{
            "name":"Marshallese",
            "nativeName":"Kajin M??aje??"
        },
        "mn":{
            "name":"Mongolian",
            "nativeName":"????????????"
        },
        "na":{
            "name":"Nauru",
            "nativeName":"Ekakair?? Naoero"
        },
        "nv":{
            "name":"Navajo, Navaho",
            "nativeName":"Din?? bizaad, Din??k??eh????"
        },
        "nb":{
            "name":"Norwegian Bokm??l",
            "nativeName":"Norsk bokm??l"
        },
        "nd":{
            "name":"North Ndebele",
            "nativeName":"isiNdebele"
        },
        "ne":{
            "name":"Nepali",
            "nativeName":"??????????????????"
        },
        "ng":{
            "name":"Ndonga",
            "nativeName":"Owambo"
        },
        "nn":{
            "name":"Norwegian Nynorsk",
            "nativeName":"Norsk nynorsk"
        },
        "no":{
            "name":"Norwegian",
            "nativeName":"Norsk"
        },
        "ii":{
            "name":"Nuosu",
            "nativeName":"????????? Nuosuhxop"
        },
        "nr":{
            "name":"South Ndebele",
            "nativeName":"isiNdebele"
        },
        "oc":{
            "name":"Occitan",
            "nativeName":"Occitan"
        },
        "oj":{
            "name":"Ojibwe, Ojibwa",
            "nativeName":"????????????????????????"
        },
        "cu":{
            "name":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
            "nativeName":"?????????? ????????????????????"
        },
        "om":{
            "name":"Oromo",
            "nativeName":"Afaan Oromoo"
        },
        "or":{
            "name":"Oriya",
            "nativeName":"???????????????"
        },
        "os":{
            "name":"Ossetian, Ossetic",
            "nativeName":"???????? ??????????"
        },
        "pa":{
            "name":"Panjabi, Punjabi",
            "nativeName":"??????????????????, ???????????????"
        },
        "pi":{
            "name":"P??li",
            "nativeName":"????????????"
        },
        "fa":{
            "name":"Persian",
            "nativeName":"??????????"
        },
        "pl":{
            "name":"Polish",
            "nativeName":"polski"
        },
        "ps":{
            "name":"Pashto, Pushto",
            "nativeName":"????????"
        },
        "pt":{
            "name":"Portuguese",
            "nativeName":"Portugu??s"
        },
        "qu":{
            "name":"Quechua",
            "nativeName":"Runa Simi, Kichwa"
        },
        "rm":{
            "name":"Romansh",
            "nativeName":"rumantsch grischun"
        },
        "rn":{
            "name":"Kirundi",
            "nativeName":"kiRundi"
        },
        "ro":{
            "name":"Romanian, Moldavian, Moldovan",
            "nativeName":"rom??n??"
        },
        "ru":{
            "name":"Russian",
            "nativeName":"?????????????? ????????"
        },
        "sa":{
            "name":"Sanskrit (Sa???sk???ta)",
            "nativeName":"???????????????????????????"
        },
        "sc":{
            "name":"Sardinian",
            "nativeName":"sardu"
        },
        "sd":{
            "name":"Sindhi",
            "nativeName":"??????????????????, ?????????? ?????????????"
        },
        "se":{
            "name":"Northern Sami",
            "nativeName":"Davvis??megiella"
        },
        "sm":{
            "name":"Samoan",
            "nativeName":"gagana faa Samoa"
        },
        "sg":{
            "name":"Sango",
            "nativeName":"y??ng?? t?? s??ng??"
        },
        "sr":{
            "name":"Serbian",
            "nativeName":"???????????? ??????????"
        },
        "gd":{
            "name":"Scottish Gaelic; Gaelic",
            "nativeName":"G??idhlig"
        },
        "sn":{
            "name":"Shona",
            "nativeName":"chiShona"
        },
        "si":{
            "name":"Sinhala, Sinhalese",
            "nativeName":"???????????????"
        },
        "sk":{
            "name":"Slovak",
            "nativeName":"sloven??ina"
        },
        "sl":{
            "name":"Slovene",
            "nativeName":"sloven????ina"
        },
        "so":{
            "name":"Somali",
            "nativeName":"Soomaaliga, af Soomaali"
        },
        "st":{
            "name":"Southern Sotho",
            "nativeName":"Sesotho"
        },
        "es":{
            "name":"Spanish, Castilian",
            "nativeName":"espa??ol, castellano"
        },
        "su":{
            "name":"Sundanese",
            "nativeName":"Basa Sunda"
        },
        "sw":{
            "name":"Swahili",
            "nativeName":"Kiswahili"
        },
        "ss":{
            "name":"Swati",
            "nativeName":"SiSwati"
        },
        "sv":{
            "name":"Swedish",
            "nativeName":"svenska"
        },
        "ta":{
            "name":"Tamil",
            "nativeName":"???????????????"
        },
        "te":{
            "name":"Telugu",
            "nativeName":"??????????????????"
        },
        "tg":{
            "name":"Tajik",
            "nativeName":"????????????, to??ik??, ???????????????"
        },
        "th":{
            "name":"Thai",
            "nativeName":"?????????"
        },
        "ti":{
            "name":"Tigrinya",
            "nativeName":"????????????"
        },
        "bo":{
            "name":"Tibetan Standard, Tibetan, Central",
            "nativeName":"?????????????????????"
        },
        "tk":{
            "name":"Turkmen",
            "nativeName":"T??rkmen, ??????????????"
        },
        "tl":{
            "name":"Tagalog",
            "nativeName":"Wikang Tagalog, ??????????????? ??????????????????"
        },
        "tn":{
            "name":"Tswana",
            "nativeName":"Setswana"
        },
        "to":{
            "name":"Tonga (Tonga Islands)",
            "nativeName":"faka Tonga"
        },
        "tr":{
            "name":"Turkish",
            "nativeName":"T??rk??e"
        },
        "ts":{
            "name":"Tsonga",
            "nativeName":"Xitsonga"
        },
        "tt":{
            "name":"Tatar",
            "nativeName":"??????????????, tatar??a, ?????????????????"
        },
        "tw":{
            "name":"Twi",
            "nativeName":"Twi"
        },
        "ty":{
            "name":"Tahitian",
            "nativeName":"Reo Tahiti"
        },
        "ug":{
            "name":"Uighur, Uyghur",
            "nativeName":"Uy??urq??, ???????????????????"
        },
        "uk":{
            "name":"Ukrainian",
            "nativeName":"????????????????????"
        },
        "ur":{
            "name":"Urdu",
            "nativeName":"????????"
        },
        "uz":{
            "name":"Uzbek",
            "nativeName":"zbek, ??????????, ???????????????"
        },
        "ve":{
            "name":"Venda",
            "nativeName":"Tshiven???a"
        },
        "vi":{
            "name":"Vietnamese",
            "nativeName":"Ti???ng Vi???t"
        },
        "vo":{
            "name":"Volap??k",
            "nativeName":"Volap??k"
        },
        "wa":{
            "name":"Walloon",
            "nativeName":"Walon"
        },
        "cy":{
            "name":"Welsh",
            "nativeName":"Cymraeg"
        },
        "wo":{
            "name":"Wolof",
            "nativeName":"Wollof"
        },
        "fy":{
            "name":"Western Frisian",
            "nativeName":"Frysk"
        },
        "xh":{
            "name":"Xhosa",
            "nativeName":"isiXhosa"
        },
        "yi":{
            "name":"Yiddish",
            "nativeName":"????????????"
        },
        "yo":{
            "name":"Yoruba",
            "nativeName":"Yor??b??"
        },
        "za":{
            "name":"Zhuang, Chuang",
            "nativeName":"Sa?? cue????, Saw cuengh"
        }
    }
    return isoLangs;
}

export {
    getSupportedLanguageDic,
    getLanguageFromCode,
    getCountryCodeFromLanguage,
    getCorrectLanguageConnection
}
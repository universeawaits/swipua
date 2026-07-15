// Turkish A1-B1 grammar cheat-sheet data.
// Each topic: { id, icon, level, title, intro, tables[], examples[], hints }
// title/intro/captions/labels carry {tr,en,ru,de,ar_sy}; table cells hold Turkish forms verbatim.
// examples carry {tr,en,ru,de,ar_sy}; hints carry {en,ru,de,ar_sy}.
// Russian explanations enriched (paraphrased) from a Russian-language Turkish workbook; forms verified.
const GRAMMAR = [
 {
  "id": "vowel-harmony",
  "icon": "🔤",
  "level": "A1",
  "title": {
   "tr": "Ünlü uyumu",
   "en": "Vowel harmony",
   "ru": "Гармония гласных",
   "de": "Vokalharmonie",
   "ar_sy": "تناغم الحركات (تناسق حروف العلة)"
  },
  "intro": {
   "tr": "Türkçede ekler kelimenin son ünlüsüne uyar. İki büyük kural vardır: iki'li uyum (e/a) ve dört'lü uyum (i/ı/u/ü). Kalın ünlüden sonra kalın, ince ünlüden sonra ince ek gelir.",
   "en": "In Turkish, suffixes change their vowel to match the last vowel of the word. There are two rules: two-way harmony (e/a) and four-way harmony (i/ı/u/ü). A back vowel is followed by a back-vowel suffix, a front vowel by a front-vowel suffix.",
   "ru": "В турецком гласный внутри суффикса не закреплён раз и навсегда — он подстраивается под ПОСЛЕДНИЙ гласный слова, поэтому один и тот же суффикс пишется по-разному. Работают два механизма. Двухвариантная гармония выбирает между e и a: после e/i/ö/ü ставим e, после a/ı/o/u ставим a. Четырёхвариантная выбирает из i/ı/u/ü и учитывает не только «передний/задний», но и огублённость: после огублённого гласного (o, u, ö, ü) идёт огублённый u или ü. Приём один: найди последний гласный слова — он и диктует форму окончания.",
   "de": "Im Türkischen passt sich der Vokal des Suffixes an den letzten Vokal des Wortes an. Es gibt zwei Regeln: die zweistufige Harmonie (e/a) und die vierstufige (i/ı/u/ü). Auf einen dunklen Vokal folgt ein dunkles, auf einen hellen ein helles Suffix.",
   "ar_sy": "بالتركي، حركة اللاحقة بتتغيّر لتناسب آخر حركة بالكلمة. في قاعدتين: تناغم ثنائي (e/a) وتناغم رباعي (i/ı/u/ü). بعد الحركة الخلفية بتجي لاحقة خلفية، وبعد الأمامية بتجي أمامية."
  },
  "tables": [
   {
    "caption": {
     "tr": "Ünlülerin sınıflandırılması",
     "en": "Classification of the vowels",
     "ru": "Классификация гласных",
     "de": "Einteilung der Vokale",
     "ar_sy": "تصنيف الحركات"
    },
    "labelHeader": {
     "tr": "",
     "en": "",
     "ru": "",
     "de": "",
     "ar_sy": ""
    },
    "columns": [
     {
      "tr": "Düz",
      "en": "Unrounded",
      "ru": "Неогубленные",
      "de": "Ungerundet",
      "ar_sy": "غير مدوّرة"
     },
     {
      "tr": "Yuvarlak",
      "en": "Rounded",
      "ru": "Огубленные",
      "de": "Gerundet",
      "ar_sy": "مدوّرة"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "Kalın (arka)",
       "en": "Back",
       "ru": "Задние",
       "de": "Dunkel (hinten)",
       "ar_sy": "خلفية"
      },
      "cells": [
       "a  ı",
       "o  u"
      ]
     },
     {
      "label": {
       "tr": "İnce (ön)",
       "en": "Front",
       "ru": "Передние",
       "de": "Hell (vorne)",
       "ar_sy": "أمامية"
      },
      "cells": [
       "e  i",
       "ö  ü"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "İkili uyum (e / a) — çoğul eki -ler / -lar",
     "en": "Two-way harmony (e / a) — plural suffix -ler / -lar",
     "ru": "Двухвариантная гармония (e / a) — суффикс мн. числа -ler / -lar",
     "de": "Zweistufige Harmonie (e / a) — Pluralsuffix -ler / -lar",
     "ar_sy": "التناغم الثنائي (e / a) — لاحقة الجمع -ler / -lar"
    },
    "columns": [
     {
      "tr": "Son ünlü",
      "en": "Last vowel",
      "ru": "Последний гласный",
      "de": "Letzter Vokal",
      "ar_sy": "آخر حركة"
     },
     {
      "tr": "Ek",
      "en": "Suffix",
      "ru": "Суффикс",
      "de": "Suffix",
      "ar_sy": "اللاحقة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "e i ö ü",
       "en": "e i ö ü",
       "ru": "e i ö ü",
       "de": "e i ö ü",
       "ar_sy": "e i ö ü"
      },
      "cells": [
       "e i ö ü",
       "-ler",
       "ev → evler, göz → gözler"
      ]
     },
     {
      "label": {
       "tr": "a ı o u",
       "en": "a ı o u",
       "ru": "a ı o u",
       "de": "a ı o u",
       "ar_sy": "a ı o u"
      },
      "cells": [
       "a ı o u",
       "-lar",
       "kız → kızlar, okul → okullar"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Dörtlü uyum (i / ı / u / ü) — belirtme hâli -i / -ı / -u / -ü",
     "en": "Four-way harmony (i / ı / u / ü) — accusative -i / -ı / -u / -ü",
     "ru": "Четырёхвариантная гармония (i / ı / u / ü) — винительный падеж -i / -ı / -u / -ü",
     "de": "Vierstufige Harmonie (i / ı / u / ü) — Akkusativ -i / -ı / -u / -ü",
     "ar_sy": "التناغم الرباعي (i / ı / u / ü) — حالة المفعول -i / -ı / -u / -ü"
    },
    "columns": [
     {
      "tr": "Son ünlü",
      "en": "Last vowel",
      "ru": "Последний гласный",
      "de": "Letzter Vokal",
      "ar_sy": "آخر حركة"
     },
     {
      "tr": "Ek",
      "en": "Suffix",
      "ru": "Суффикс",
      "de": "Suffix",
      "ar_sy": "اللاحقة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "e i",
       "en": "e i",
       "ru": "e i",
       "de": "e i",
       "ar_sy": "e i"
      },
      "cells": [
       "e i",
       "-i",
       "ev → evi, iş → işi"
      ]
     },
     {
      "label": {
       "tr": "a ı",
       "en": "a ı",
       "ru": "a ı",
       "de": "a ı",
       "ar_sy": "a ı"
      },
      "cells": [
       "a ı",
       "-ı",
       "kapı → kapıyı, kız → kızı"
      ]
     },
     {
      "label": {
       "tr": "o u",
       "en": "o u",
       "ru": "o u",
       "de": "o u",
       "ar_sy": "o u"
      },
      "cells": [
       "o u",
       "-u",
       "okul → okulu, yol → yolu"
      ]
     },
     {
      "label": {
       "tr": "ö ü",
       "en": "ö ü",
       "ru": "ö ü",
       "de": "ö ü",
       "ar_sy": "ö ü"
      },
      "cells": [
       "ö ü",
       "-ü",
       "göz → gözü, gün → günü"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Evler büyük, ama okullar küçük.",
    "en": "The houses are big, but the schools are small.",
    "ru": "Дома большие, а школы маленькие.",
    "de": "Die Häuser sind groß, aber die Schulen sind klein.",
    "ar_sy": "البيوت كبيرة، بس المدارس صغيرة."
   },
   {
    "tr": "Gözlerim yoruldu, biraz uyumak istiyorum.",
    "en": "My eyes are tired, I want to sleep a little.",
    "ru": "Мои глаза устали, я хочу немного поспать.",
    "de": "Meine Augen sind müde, ich möchte ein bisschen schlafen.",
    "ar_sy": "عيوني تعبانة، بدّي نام شوي."
   },
   {
    "tr": "Kitabı masaya koydum.",
    "en": "I put the book on the table.",
    "ru": "Я положил книгу на стол.",
    "de": "Ich habe das Buch auf den Tisch gelegt.",
    "ar_sy": "حطّيت الكتاب عالطاولة."
   },
   {
    "tr": "Yolu bilmiyorum, sen biliyor musun?",
    "en": "I don't know the way, do you know it?",
    "ru": "Я не знаю дороги, а ты знаешь?",
    "de": "Ich kenne den Weg nicht, kennst du ihn?",
    "ar_sy": "ما بعرف الطريق، إنت بتعرفو؟"
   },
   {
    "tr": "Günü güzel geçirdik.",
    "en": "We spent the day nicely.",
    "ru": "Мы хорошо провели день.",
    "de": "Wir haben den Tag schön verbracht.",
    "ar_sy": "قضّينا اليوم بشكل حلو."
   }
  ],
  "hints": {
   "en": "English suffixes never change their vowel (cats/dogs both use -s). In Turkish the same suffix has 2 or 4 spellings — you must scan the LAST vowel of the word before adding any ending. The letters ı (dotless) and i (dotted) are two different vowels.",
   "ru": "В русском окончание зависит от рода, числа и падежа, но НИКОГДА — от того, «задний» или «передний» гласный в корне; в турецком именно последний гласный слова решает, какую из 2 или 4 форм примет суффикс. Три типичные ошибки русскоговорящих: (1) путают ı и i — это разные буквы и разные звуки, а не «твёрдое/мягкое и»; (2) в четырёхвариантной гармонии забывают про огублённость и после o/u/ö/ü ставят i/ı вместо u/ü (okulu, а не okuli); (3) машинально смягчают согласный, тогда как в турецком «мягкость» несёт сам гласный. Порядок действий всегда один: сначала найди последний гласный, потом добавляй окончание.",
   "de": "Anders als deutsche Endungen (die -e, -en usw. ohne Rücksicht auf den Vokal anhängen) richtet sich das türkische Suffix nach dem letzten Vokal des Wortes. Achte auf die Paare o/ö und u/ü — sie funktionieren wie im Deutschen, entscheiden aber hier über die Suffixform.",
   "ar_sy": "بالعربي اللاحقة ما بتتغيّر حسب حركة الكلمة، بس بالتركي لازم تشوف آخر حركة بالكلمة قبل ما تضيف أي لاحقة. وانتبه: ı وi حرفين مختلفين، وكمان o/ö وu/ü أصوات ما موجودة بالعربي فخُد بالك منها."
  }
 },
 {
  "id": "consonant-changes",
  "icon": "🔀",
  "level": "A1",
  "title": {
   "tr": "Ünsüz Yumuşaması ve Benzeşmesi",
   "en": "Consonant Softening & Assimilation",
   "ru": "Смягчение и ассимиляция согласных",
   "de": "Konsonantenerweichung und -assimilation",
   "ar_sy": "تليين الحروف الساكنة وتناغمها"
  },
  "intro": {
   "tr": "Türkçede bir kelime, ünlüyle başlayan bir ek aldığında sondaki sert ünsüz yumuşar: p→b, ç→c, t→d, k→ğ. Ayrıca -de/-te, -den/-tan gibi eklerde kelime sert (sessiz) bir ünsüzle bitiyorsa ek t ile başlar, yoksa d ile başlar.",
   "en": "In Turkish, when a word takes a suffix that starts with a vowel, a final hard consonant softens: p→b, ç→c, t→d, k→ğ. Also, suffixes like -de/-te and -den/-tan begin with t after a voiceless consonant and with d otherwise.",
   "ru": "В турецком у многих слов конечные глухие p, ç, t, k при добавлении суффикса, начинающегося с гласной, озвончаются и переходят в b, c, d, ğ — и это изменение обязательно отражается на письме: kitap → kitabı (а не «kitapı»). Чаще всего вы столкнётесь с этим в винительном, родительном и дательном падежах. Отдельно работает ассимиляция в самом суффиксе: -de/-te и -den/-tan начинаются с t после глухого согласного и с d во всех остальных случаях.",
   "de": "Wenn im Türkischen ein Wort ein mit Vokal beginnendes Suffix erhält, wird ein harter Endkonsonant weich: p→b, ç→c, t→d, k→ğ. Außerdem beginnen Suffixe wie -de/-te und -den/-tan nach einem stimmlosen Konsonanten mit t, sonst mit d.",
   "ar_sy": "بالتركي، لما الكلمة تاخد لاحقة بتبدأ بحرف علة، الحرف الساكن القاسي بآخر الكلمة بيلين: p→b، ç→c، t→d، k→ğ. وكمان لواحق متل ‑de/‑te و‑den/‑tan بتبدأ بـ t بعد حرف مهموس، وبـ d بغير هيك."
  },
  "tables": [
   {
    "caption": {
     "tr": "Sondaki sert ünsüzün yumuşaması (ünlüden önce)",
     "en": "Final consonant softening (before a vowel)",
     "ru": "Смягчение конечного согласного (перед гласной)",
     "de": "Erweichung des Endkonsonanten (vor einem Vokal)",
     "ar_sy": "تليين الحرف الساكن الأخير (قبل حرف علة)"
    },
    "labelHeader": {
     "tr": "Ses değişimi",
     "en": "Sound change",
     "ru": "Изменение звука",
     "de": "Lautwechsel",
     "ar_sy": "تغيّر الصوت"
    },
    "columns": [
     {
      "tr": "Yalın hâl",
      "en": "Base form",
      "ru": "Исходная форма",
      "de": "Grundform",
      "ar_sy": "الشكل المجرّد"
     },
     {
      "tr": "Ünlü ekle",
      "en": "With a vowel suffix",
      "ru": "С гласным суффиксом",
      "de": "Mit Vokalsuffix",
      "ar_sy": "مع لاحقة حرف علة"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "p → b",
       "en": "p → b",
       "ru": "p → b",
       "de": "p → b",
       "ar_sy": "p → b"
      },
      "cells": [
       "kitap",
       "kitabı"
      ]
     },
     {
      "label": {
       "tr": "ç → c",
       "en": "ç → c",
       "ru": "ç → c",
       "de": "ç → c",
       "ar_sy": "ç → c"
      },
      "cells": [
       "ağaç",
       "ağacı"
      ]
     },
     {
      "label": {
       "tr": "t → d",
       "en": "t → d",
       "ru": "t → d",
       "de": "t → d",
       "ar_sy": "t → d"
      },
      "cells": [
       "kağıt",
       "kağıdı"
      ]
     },
     {
      "label": {
       "tr": "k → ğ",
       "en": "k → ğ",
       "ru": "k → ğ",
       "de": "k → ğ",
       "ar_sy": "k → ğ"
      },
      "cells": [
       "ekmek",
       "ekmeği"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Eklerde d/t değişimi: bulunma ve ayrılma hâli",
     "en": "d/t alternation in suffixes: locative and ablative",
     "ru": "Чередование d/t в суффиксах: местный и исходный падеж",
     "de": "d/t-Wechsel in Suffixen: Lokativ und Ablativ",
     "ar_sy": "تبدّل d/t باللواحق: حالة المكان وحالة الابتعاد"
    },
    "columns": [
     {
      "tr": "Kelime",
      "en": "Word",
      "ru": "Слово",
      "de": "Wort",
      "ar_sy": "الكلمة"
     },
     {
      "tr": "-de / -te (nerede?)",
      "en": "-de / -te (locative)",
      "ru": "-de / -te (местный)",
      "de": "-de / -te (Lokativ)",
      "ar_sy": "-de / -te (المكان)"
     },
     {
      "tr": "-den / -tan (nereden?)",
      "en": "-den / -tan (ablative)",
      "ru": "-den / -tan (исходный)",
      "de": "-den / -tan (Ablativ)",
      "ar_sy": "-den / -tan (الابتعاد)"
     }
    ],
    "rows": [
     {
      "cells": [
       "ev",
       "evde",
       "evden"
      ]
     },
     {
      "cells": [
       "okul",
       "okulda",
       "okuldan"
      ]
     },
     {
      "cells": [
       "sokak",
       "sokakta",
       "sokaktan"
      ]
     },
     {
      "cells": [
       "uçak",
       "uçakta",
       "uçaktan"
      ]
     },
     {
      "cells": [
       "kitap",
       "kitapta",
       "kitaptan"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Kitabı dün okudum.",
    "en": "I read the book yesterday.",
    "ru": "Я прочитал книгу вчера.",
    "de": "Ich habe das Buch gestern gelesen.",
    "ar_sy": "قريت الكتاب مبارح."
   },
   {
    "tr": "Ekmeği fırından aldım.",
    "en": "I bought the bread from the bakery.",
    "ru": "Я купил хлеб в пекарне.",
    "de": "Ich habe das Brot von der Bäckerei geholt.",
    "ar_sy": "جبت الخبز من الفرن."
   },
   {
    "tr": "Sokakta bir kedi var.",
    "en": "There is a cat on the street.",
    "ru": "На улице есть кошка.",
    "de": "Auf der Straße ist eine Katze.",
    "ar_sy": "في قطة بالشارع."
   },
   {
    "tr": "Bugün evde kimse yok.",
    "en": "There is nobody at home today.",
    "ru": "Сегодня дома никого нет.",
    "de": "Heute ist niemand zu Hause.",
    "ar_sy": "اليوم ما في حدا بالبيت."
   },
   {
    "tr": "Uçaktan yeni indim.",
    "en": "I just got off the plane.",
    "ru": "Я только что вышел из самолёта.",
    "de": "Ich bin gerade aus dem Flugzeug ausgestiegen.",
    "ar_sy": "لسا نزلت من الطيارة."
   }
  ],
  "hints": {
   "en": "Unlike English, Turkish changes the spelling, not just the sound: a final p, ç, t, k becomes b, c, d, ğ once a vowel-initial suffix is added. Also choose -te/-ten (not -de/-den) after a voiceless consonant.",
   "ru": "Главная ловушка для русскоговорящих: в русском мы конечные согласные оглушаем, но на письме не меняем (пишем «дуб», хотя говорим «дуп»). В турецком всё наоборот — перед гласной согласный не просто озвончается, но и переписывается: kitap → kitabı, kağıt → kağıdı, ekmek → ekmeği; форма «kitapı» — ошибка. Ловушка №2 — сам суффикс: после глухих p, ç, t, k, s, ş, h, f ставьте вариант с t (sokakta, uçaktan), а в остальных случаях с d (evde, evden). Учтите, что озвончаются не все слова: многие короткие исконные слова остаются без изменений (at → atı, top → topu), поэтому новые слова лучше проверять по словарю.",
   "de": "Im Deutschen werden Endkonsonanten hart gesprochen (Auslautverhärtung: Tag wie Tak); Türkisch macht vor einem Vokal das Gegenteil und schreibt die Änderung auch. Nach stimmlosem Konsonanten heißt es -te/-ten statt -de/-den.",
   "ar_sy": "بالعربي جذر الكلمة ما بيتغيّر هيك؛ بس بالتركي الحرف الأخير القاسي بيلين لما تجي لاحقة بتبدأ بحرف علة، والتغيير بينكتب. وانتبه: اللاحقة بتبدأ بـ t (‑te/‑ten) بعد حرف مهموس، وبـ d (‑de/‑den) بغير هيك."
  }
 },
 {
  "id": "plural",
  "icon": "➕",
  "level": "A1",
  "title": {
   "tr": "Çoğul eki -lar/-ler",
   "en": "The plural suffix -lar/-ler",
   "ru": "Суффикс множественного числа -lar/-ler",
   "de": "Das Pluralsuffix -lar/-ler",
   "ar_sy": "لاحقة الجمع -lar/-ler"
  },
  "intro": {
   "tr": "Türkçede ismi çoğul yapmak için kelimenin sonuna -lar veya -ler ekleriz. Ekin seçimi son sesli harfe bağlıdır (ünlü uyumu): kalın ünlüden sonra -lar, ince ünlüden sonra -ler. Sayıdan sonra çoğul eki kullanılmaz.",
   "en": "In Turkish we make a noun plural by adding -lar or -ler to the end of the word. The choice depends on the last vowel (vowel harmony): -lar after a back vowel, -ler after a front vowel. After a number, the plural suffix is NOT used.",
   "ru": "Множественное число в турецком устроено предельно просто: к концу слова добавляется всего один суффикс — -lar или -ler, без чередований в корне и без категории рода (рода в турецком нет вообще). Какой из двух вариантов взять, подсказывает последняя гласная слова (гармония гласных): после задних a, ı, o, u ставим -lar, после передних e, i, ö, ü — -ler. И запомните сразу главную особенность: после числительного или после слова çok («много») существительное остаётся в единственном числе — по-турецки говорят буквально «три книга», а не «три книги».",
   "de": "Im Türkischen bildet man den Plural, indem man -lar oder -ler an das Wortende hängt. Die Wahl richtet sich nach dem letzten Vokal (Vokalharmonie): -lar nach hinterem Vokal, -ler nach vorderem Vokal. Nach einer Zahl wird das Pluralsuffix NICHT verwendet.",
   "ar_sy": "بالتركي منخلّي الاسم جمع لمّا نزيد -lar أو -ler بآخر الكلمة. الاختيار بيعتمد عالحرف المتحرك الأخير (تناغم الحركات): -lar بعد حركة خلفية، و-ler بعد حركة أمامية. بعد الرقم ما مننستعمل لاحقة الجمع."
  },
  "tables": [
   {
    "caption": {
     "tr": "Ünlü uyumuna göre ek seçimi",
     "en": "Choosing the suffix by vowel harmony",
     "ru": "Выбор суффикса по гармонии гласных",
     "de": "Suffixwahl nach Vokalharmonie",
     "ar_sy": "اختيار اللاحقة حسب تناغم الحركات"
    },
    "labelHeader": {
     "tr": "Son ünlü",
     "en": "Last vowel",
     "ru": "Последняя гласная",
     "de": "Letzter Vokal",
     "ar_sy": "الحركة الأخيرة"
    },
    "columns": [
     {
      "tr": "Ek",
      "en": "Suffix",
      "ru": "Суффикс",
      "de": "Suffix",
      "ar_sy": "اللاحقة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "a, ı, o, u (kalın)",
       "en": "a, ı, o, u (back)",
       "ru": "a, ı, o, u (задние)",
       "de": "a, ı, o, u (hinten)",
       "ar_sy": "a, ı, o, u (خلفية)"
      },
      "cells": [
       "-lar",
       "kitap → kitaplar"
      ]
     },
     {
      "label": {
       "tr": "e, i, ö, ü (ince)",
       "en": "e, i, ö, ü (front)",
       "ru": "e, i, ö, ü (передние)",
       "de": "e, i, ö, ü (vorne)",
       "ar_sy": "e, i, ö, ü (أمامية)"
      },
      "cells": [
       "-ler",
       "ev → evler"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Tekil ve çoğul",
     "en": "Singular and plural",
     "ru": "Единственное и множественное число",
     "de": "Singular und Plural",
     "ar_sy": "المفرد والجمع"
    },
    "columns": [
     {
      "tr": "Tekil",
      "en": "Singular",
      "ru": "Ед. число",
      "de": "Singular",
      "ar_sy": "مفرد"
     },
     {
      "tr": "Çoğul",
      "en": "Plural",
      "ru": "Мн. число",
      "de": "Plural",
      "ar_sy": "جمع"
     }
    ],
    "rows": [
     {
      "cells": [
       "araba",
       "arabalar"
      ]
     },
     {
      "cells": [
       "öğrenci",
       "öğrenciler"
      ]
     },
     {
      "cells": [
       "çocuk",
       "çocuklar"
      ]
     },
     {
      "cells": [
       "gün",
       "günler"
      ]
     },
     {
      "cells": [
       "kız",
       "kızlar"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Sayıdan sonra çoğul yok",
     "en": "No plural after a number",
     "ru": "После числительного нет множественного числа",
     "de": "Kein Plural nach einer Zahl",
     "ar_sy": "ما في جمع بعد الرقم"
    },
    "columns": [
     {
      "tr": "Doğru",
      "en": "Correct",
      "ru": "Правильно",
      "de": "Richtig",
      "ar_sy": "صح"
     },
     {
      "tr": "Yanlış",
      "en": "Wrong",
      "ru": "Неправильно",
      "de": "Falsch",
      "ar_sy": "غلط"
     }
    ],
    "rows": [
     {
      "cells": [
       "üç kitap",
       "üç kitaplar"
      ]
     },
     {
      "cells": [
       "beş ev",
       "beş evler"
      ]
     },
     {
      "cells": [
       "çok araba",
       "çok arabalar"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Sınıfta çok öğrenci var.",
    "en": "There are many students in the classroom.",
    "ru": "В классе много учеников.",
    "de": "Im Klassenzimmer sind viele Schüler.",
    "ar_sy": "في كتير طلاب بالصف."
   },
   {
    "tr": "Çocuklar bahçede oynuyor.",
    "en": "The children are playing in the garden.",
    "ru": "Дети играют в саду.",
    "de": "Die Kinder spielen im Garten.",
    "ar_sy": "الولاد عم يلعبوا بالحديقة."
   },
   {
    "tr": "Masada üç kitap var.",
    "en": "There are three books on the table.",
    "ru": "На столе три книги.",
    "de": "Auf dem Tisch liegen drei Bücher.",
    "ar_sy": "في تلات كتب عالطاولة."
   },
   {
    "tr": "Evler çok güzel.",
    "en": "The houses are very beautiful.",
    "ru": "Дома очень красивые.",
    "de": "Die Häuser sind sehr schön.",
    "ar_sy": "البيوت كتير حلوة."
   },
   {
    "tr": "Arkadaşlarım bugün geliyor.",
    "en": "My friends are coming today.",
    "ru": "Мои друзья приходят сегодня.",
    "de": "Meine Freunde kommen heute.",
    "ar_sy": "رفقاتي جايين اليوم."
   }
  ],
  "hints": {
   "en": "Turkish has only ONE plural marker (-lar/-ler) and its form is fixed by vowel harmony, not by endings like the English -s/-es/-ies. The biggest trap: after a number or 'çok' (many), keep the noun singular — say 'üç kitap' (three book), never 'üç kitaplar'.",
   "ru": "В русском множественное число тянет за собой разные окончания и чередования в корне (дом — дома, стул — стулья, друг — друзья); в турецком же есть ровно один регулярный суффикс -lar/-ler, и выбирается он только по последней гласной. Главная ловушка русскоговорящих идёт от привычки: мы говорим «три стола», «много книг» во множественном числе, а турецкий требует после числительного и после çok («много») оставить существительное в единственном — 'üç kitap' (букв. «три книга»), 'çok kitap', и никогда не 'üç kitaplar'.",
   "de": "Türkisch hat nur EIN Pluralzeichen (-lar/-ler), dessen Form allein durch die Vokalharmonie bestimmt wird — keine unregelmäßigen Plurale wie im Deutschen. Achtung: Nach einer Zahl oder nach 'çok' (viele) bleibt das Nomen im Singular — 'üç kitap' (drei Buch), nie 'üç kitaplar'.",
   "ar_sy": "بالتركي في لاحقة جمع وحدة بس (-lar/-ler) وشكلها بيتحدد من تناغم الحركات، ما في مثنى ولا جمع تكسير متل العربي. أهم شي: بعد الرقم أو بعد 'çok' (كتير) الاسم بيضل مفرد — منقول 'üç kitap' (تلات كتاب) مو 'üç kitaplar'."
  }
 },
 {
  "id": "pronouns",
  "icon": "🧑",
  "level": "A1",
  "title": {
   "tr": "Kişi Zamirleri",
   "en": "Personal Pronouns",
   "ru": "Личные местоимения",
   "de": "Personalpronomen",
   "ar_sy": "الضمائر الشخصية"
  },
  "intro": {
   "tr": "Kişi zamirleri ben, sen, o, biz, siz, onlar'dır. Cümledeki göreve göre hâl ekleri alırlar (beni, bana, bende...). \"bana\" ve \"sana\" düzensizdir.",
   "en": "The personal pronouns are ben, sen, o, biz, siz, onlar. They take case endings depending on their role in the sentence (beni, bana, bende…). Watch out for the irregular \"bana\" and \"sana\".",
   "ru": "Личных местоимений в турецком шесть: ben (я), sen (ты), o (он/она/оно — рода нет), biz (мы), siz (вы), onlar (они). Роль местоимения показывает не предлог, как в русском, а падежное окончание, приклеенное прямо к слову: beni (меня), bana (мне), bende (у меня), benden (от меня). Запомните исключения: дательный bana/sana (а не «bene/sene») и родительный benim/bizim (с -im вместо ожидаемого -in).",
   "de": "Die Personalpronomen sind ben, sen, o, biz, siz, onlar. Sie erhalten Kasusendungen je nach ihrer Funktion im Satz (beni, bana, bende…). Achtung: \"bana\" und \"sana\" sind unregelmäßig.",
   "ar_sy": "الضمائر الشخصية هي ben, sen, o, biz, siz, onlar. بتاخد لاحقات حسب موقعها بالجملة (beni, bana, bende…). انتبه لـ \"bana\" و\"sana\" لأنن شواذ."
  },
  "tables": [
   {
    "caption": {
     "tr": "Kişi zamirlerinin hâlleri",
     "en": "Case forms of the personal pronouns",
     "ru": "Падежные формы личных местоимений",
     "de": "Kasusformen der Personalpronomen",
     "ar_sy": "حالات الضمائر الشخصية"
    },
    "labelHeader": {
     "tr": "Hâl",
     "en": "Case",
     "ru": "Падеж",
     "de": "Fall",
     "ar_sy": "الحالة"
    },
    "columns": [
     {
      "tr": "ben",
      "en": "I",
      "ru": "я",
      "de": "ich",
      "ar_sy": "أنا"
     },
     {
      "tr": "sen",
      "en": "you (sg.)",
      "ru": "ты",
      "de": "du",
      "ar_sy": "إنت"
     },
     {
      "tr": "o",
      "en": "he/she/it",
      "ru": "он/она/оно",
      "de": "er/sie/es",
      "ar_sy": "هو/هي"
     },
     {
      "tr": "biz",
      "en": "we",
      "ru": "мы",
      "de": "wir",
      "ar_sy": "نحنا"
     },
     {
      "tr": "siz",
      "en": "you (pl.)",
      "ru": "вы",
      "de": "ihr/Sie",
      "ar_sy": "إنتو"
     },
     {
      "tr": "onlar",
      "en": "they",
      "ru": "они",
      "de": "sie",
      "ar_sy": "هنّي"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "Yalın (özne)",
       "en": "Nominative (subject)",
       "ru": "Именительный (подлежащее)",
       "de": "Nominativ (Subjekt)",
       "ar_sy": "المجرّد (فاعل)"
      },
      "cells": [
       "ben",
       "sen",
       "o",
       "biz",
       "siz",
       "onlar"
      ]
     },
     {
      "label": {
       "tr": "Belirtme (-i)",
       "en": "Accusative (-i)",
       "ru": "Винительный (-i)",
       "de": "Akkusativ (-i)",
       "ar_sy": "المفعول (-i)"
      },
      "cells": [
       "beni",
       "seni",
       "onu",
       "bizi",
       "sizi",
       "onları"
      ]
     },
     {
      "label": {
       "tr": "Yönelme (-e)",
       "en": "Dative (-e)",
       "ru": "Дательный (-e)",
       "de": "Dativ (-e)",
       "ar_sy": "الاتجاه (-e)"
      },
      "cells": [
       "bana",
       "sana",
       "ona",
       "bize",
       "size",
       "onlara"
      ]
     },
     {
      "label": {
       "tr": "Bulunma (-de)",
       "en": "Locative (-de)",
       "ru": "Местный (-de)",
       "de": "Lokativ (-de)",
       "ar_sy": "المكان (-de)"
      },
      "cells": [
       "bende",
       "sende",
       "onda",
       "bizde",
       "sizde",
       "onlarda"
      ]
     },
     {
      "label": {
       "tr": "Ayrılma (-den)",
       "en": "Ablative (-den)",
       "ru": "Исходный (-den)",
       "de": "Ablativ (-den)",
       "ar_sy": "الابتداء (-den)"
      },
      "cells": [
       "benden",
       "senden",
       "ondan",
       "bizden",
       "sizden",
       "onlardan"
      ]
     },
     {
      "label": {
       "tr": "İlgi (-in)",
       "en": "Genitive (-in)",
       "ru": "Родительный (-in)",
       "de": "Genitiv (-in)",
       "ar_sy": "الإضافة (-in)"
      },
      "cells": [
       "benim",
       "senin",
       "onun",
       "bizim",
       "sizin",
       "onların"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Ben öğretmenim.",
    "en": "I am a teacher.",
    "ru": "Я учитель.",
    "de": "Ich bin Lehrer.",
    "ar_sy": "أنا معلّم."
   },
   {
    "tr": "Bana bir kahve ver.",
    "en": "Give me a coffee.",
    "ru": "Дай мне кофе.",
    "de": "Gib mir einen Kaffee.",
    "ar_sy": "عطيني قهوة."
   },
   {
    "tr": "O beni tanıyor.",
    "en": "He/She knows me.",
    "ru": "Он/она меня знает.",
    "de": "Er/Sie kennt mich.",
    "ar_sy": "هو بيعرفني."
   },
   {
    "tr": "Bu kitap senin mi?",
    "en": "Is this book yours?",
    "ru": "Это твоя книга?",
    "de": "Ist das dein Buch?",
    "ar_sy": "هالكتاب إلك؟"
   },
   {
    "tr": "Onları her gün görüyoruz.",
    "en": "We see them every day.",
    "ru": "Мы видим их каждый день.",
    "de": "Wir sehen sie jeden Tag.",
    "ar_sy": "منشوفهن كل يوم."
   }
  ],
  "hints": {
   "en": "Turkish marks the pronoun's role with case endings (beni, bana, bende…) instead of separate words like English \"me, to me\". Memorize the irregular \"bana\" and \"sana\" (not \"bene/sene\"). Subject pronouns are often dropped because the verb ending already shows the person.",
   "ru": "Русскому предлог не нужен: «мне» = bana, «у меня» = bende, «от меня» = benden — всё умещается в одно слово. Самая частая ошибка русскоговорящих — сказать «bene/sene»; правильно только bana/sana, а «мой/твой» — это отдельные формы benim/senin. Местоимение-подлежащее обычно опускают (Öğretmenim = «Я учитель»), потому что лицо уже видно по окончанию глагола; ставьте ben, sen лишь для смыслового ударения. И помните: o рода не имеет, поэтому одно слово значит и «он», и «она», и «оно».",
   "de": "Türkisch zeigt die Rolle des Pronomens durch Kasusendungen (beni, bana, bende…), nicht durch Präpositionen wie im Deutschen. Merken Sie sich die unregelmäßigen Formen \"bana\" und \"sana\" (nicht \"bene/sene\"). Das Subjektpronomen entfällt oft, da die Verbendung die Person schon anzeigt.",
   "ar_sy": "بالتركي دور الضمير بيبيّن بلاحقة على آخر الكلمة (beni, bana, bende…) مو بحرف جر متل العربي. احفظ الشواذ \"bana\" و\"sana\" (مو \"bene/sene\"). وكتير مرات بينحذف ضمير الفاعل لأن آخر الفعل عم يبيّن مين الشخص."
  }
 },
 {
  "id": "to-be",
  "icon": "🟰",
  "level": "A1",
  "title": {
   "tr": "Ek fiil (kişi ekleri) ve var/yok",
   "en": "To be: personal suffixes & var/yok",
   "ru": "Глагол «быть»: личные окончания и var/yok",
   "de": "Sein: Personalsuffixe & var/yok",
   "ar_sy": "فعل الكينونة: لواحق الأشخاص وvar/yok"
  },
  "intro": {
   "tr": "Türkçede 'olmak/-dır' ayrı bir kelime değildir; kişi eki olarak kelimenin sonuna eklenir ve ses uyumuna göre değişir. Olumsuz 'değil' ile, soru '-mı/-mi' ile yapılır. Bir şeyin olup olmadığını söylemek için 'var' ve 'yok' kullanılır.",
   "en": "In Turkish, 'to be' is not a separate word; it is attached as a personal ending to the end of the word and changes with vowel harmony. The negative uses 'değil', the question uses '-mı/-mi'. To say something exists or not, use 'var' and 'yok'.",
   "ru": "В турецком нет отдельного глагола «быть» в настоящем времени — его роль играет личное окончание, которое приклеивается к последнему слову сказуемого: Ben öğretmenim — «Я учитель». Русскоговорящие постоянно его теряют, ведь по-русски мы и так говорим «Я учитель» без связки, но по-турецки без окончания фраза звучит оборванной. Окончание подчиняется гармонии гласных (-ım/-im/-um/-üm), а в 3-м лице его обычно нет (o hasta — «он болен»). Отрицание — это отдельное слово değil после имени или прилагательного (hasta değilim), а не суффикс; вопрос образует частица mı/mi. А чтобы сказать, что что-то «есть» или «нет», используют не окончания, а слова var и yok, которые ставятся в самый конец предложения.",
   "de": "Im Türkischen ist 'sein' kein eigenes Wort, sondern wird als Personalendung an das Wortende gehängt und richtet sich nach der Vokalharmonie. Die Verneinung bildet man mit 'değil', die Frage mit '-mı/-mi'. Um zu sagen, ob es etwas gibt, benutzt man 'var' und 'yok'.",
   "ar_sy": "بالتركي 'يكون' مو كلمة لحالها، بينضاف كلاحقة شخص بآخر الكلمة وبيتغيّر حسب انسجام الحركات. النفي بيصير بـ'değil'، والسؤال بـ'-mı/-mi'. ولَتقول إنه في شي أو ما في، بتستعمل 'var' و'yok'."
  },
  "tables": [
   {
    "caption": {
     "tr": "Kişi ekleri (ek fiil)",
     "en": "Personal suffixes (copula)",
     "ru": "Личные окончания (связка)",
     "de": "Personalsuffixe (Kopula)",
     "ar_sy": "لواحق الأشخاص (رابط الإسناد)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "hasta (ünlüyle biten)",
      "en": "hasta (ill)",
      "ru": "hasta (больной)",
      "de": "hasta (krank)",
      "ar_sy": "hasta (مريض)"
     },
     {
      "tr": "yorgun (ünsüzle biten)",
      "en": "yorgun (tired)",
      "ru": "yorgun (усталый)",
      "de": "yorgun (müde)",
      "ar_sy": "yorgun (تعبان)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "ben (I)",
       "ru": "ben (я)",
       "de": "ben (ich)",
       "ar_sy": "ben (أنا)"
      },
      "cells": [
       "hastayım",
       "yorgunum"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "sen (you)",
       "ru": "sen (ты)",
       "de": "sen (du)",
       "ar_sy": "sen (إنتَ)"
      },
      "cells": [
       "hastasın",
       "yorgunsun"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "o (he/she/it)",
       "ru": "o (он/она/оно)",
       "de": "o (er/sie/es)",
       "ar_sy": "o (هو/هي)"
      },
      "cells": [
       "hasta (hastadır)",
       "yorgun (yorgundur)"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "biz (we)",
       "ru": "biz (мы)",
       "de": "biz (wir)",
       "ar_sy": "biz (نِحنا)"
      },
      "cells": [
       "hastayız",
       "yorgunuz"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "siz (you pl.)",
       "ru": "siz (вы)",
       "de": "siz (ihr/Sie)",
       "ar_sy": "siz (إنتو)"
      },
      "cells": [
       "hastasınız",
       "yorgunsunuz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "onlar (they)",
       "ru": "onlar (они)",
       "de": "onlar (sie)",
       "ar_sy": "onlar (هنّي)"
      },
      "cells": [
       "hastalar",
       "yorgunlar"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Olumsuz (değil) ve soru (-mı)",
     "en": "Negative (değil) and question (-mı)",
     "ru": "Отрицание (değil) и вопрос (-mı)",
     "de": "Verneinung (değil) und Frage (-mı)",
     "ar_sy": "النفي (değil) والسؤال (-mı)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "Olumsuz (değil)",
      "en": "Negative (değil)",
      "ru": "Отрицание (değil)",
      "de": "Verneinung (değil)",
      "ar_sy": "النفي (değil)"
     },
     {
      "tr": "Soru (-mı)",
      "en": "Question (-mı)",
      "ru": "Вопрос (-mı)",
      "de": "Frage (-mı)",
      "ar_sy": "السؤال (-mı)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "ben (I)",
       "ru": "ben (я)",
       "de": "ben (ich)",
       "ar_sy": "ben (أنا)"
      },
      "cells": [
       "hasta değilim",
       "hasta mıyım?"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "sen (you)",
       "ru": "sen (ты)",
       "de": "sen (du)",
       "ar_sy": "sen (إنتَ)"
      },
      "cells": [
       "hasta değilsin",
       "hasta mısın?"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "o (he/she/it)",
       "ru": "o (он/она)",
       "de": "o (er/sie/es)",
       "ar_sy": "o (هو/هي)"
      },
      "cells": [
       "hasta değil",
       "hasta mı?"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "biz (we)",
       "ru": "biz (мы)",
       "de": "biz (wir)",
       "ar_sy": "biz (نِحنا)"
      },
      "cells": [
       "hasta değiliz",
       "hasta mıyız?"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "siz (you pl.)",
       "ru": "siz (вы)",
       "de": "siz (ihr/Sie)",
       "ar_sy": "siz (إنتو)"
      },
      "cells": [
       "hasta değilsiniz",
       "hasta mısınız?"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "onlar (they)",
       "ru": "onlar (они)",
       "de": "onlar (sie)",
       "ar_sy": "onlar (هنّي)"
      },
      "cells": [
       "hasta değiller",
       "hastalar mı?"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Var / Yok (varlık)",
     "en": "Var / Yok (existence)",
     "ru": "Var / Yok (наличие)",
     "de": "Var / Yok (Existenz)",
     "ar_sy": "Var / Yok (الوجود)"
    },
    "labelHeader": {
     "tr": "Yapı",
     "en": "Form",
     "ru": "Форма",
     "de": "Form",
     "ar_sy": "الصيغة"
    },
    "columns": [
     {
      "tr": "Örnek cümle",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "Var (mevcut)",
       "en": "There is (var)",
       "ru": "Есть (var)",
       "de": "Es gibt (var)",
       "ar_sy": "في (var)"
      },
      "cells": [
       "Evde süt var."
      ]
     },
     {
      "label": {
       "tr": "Yok",
       "en": "There isn't (yok)",
       "ru": "Нет (yok)",
       "de": "Es gibt nicht (yok)",
       "ar_sy": "ما في (yok)"
      },
      "cells": [
       "Evde süt yok."
      ]
     },
     {
      "label": {
       "tr": "Soru",
       "en": "Question",
       "ru": "Вопрос",
       "de": "Frage",
       "ar_sy": "سؤال"
      },
      "cells": [
       "Evde süt var mı?"
      ]
     },
     {
      "label": {
       "tr": "Kısa cevap",
       "en": "Short answer",
       "ru": "Краткий ответ",
       "de": "Kurzantwort",
       "ar_sy": "جواب قصير"
      },
      "cells": [
       "Evet, var. / Hayır, yok."
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Ben öğretmenim.",
    "en": "I am a teacher.",
    "ru": "Я учитель.",
    "de": "Ich bin Lehrer.",
    "ar_sy": "أنا مْعَلِّم."
   },
   {
    "tr": "Sen Türk müsün?",
    "en": "Are you Turkish?",
    "ru": "Ты турок?",
    "de": "Bist du Türke?",
    "ar_sy": "إنتَ تُركي؟"
   },
   {
    "tr": "Biz yorgun değiliz.",
    "en": "We are not tired.",
    "ru": "Мы не устали.",
    "de": "Wir sind nicht müde.",
    "ar_sy": "نِحنا مو تعبانين."
   },
   {
    "tr": "Sınıfta bir masa var.",
    "en": "There is a table in the classroom.",
    "ru": "В классе есть стол.",
    "de": "Im Klassenzimmer gibt es einen Tisch.",
    "ar_sy": "في طاولة بالصَّف."
   },
   {
    "tr": "Evde kimse yok.",
    "en": "There is no one at home.",
    "ru": "Дома никого нет.",
    "de": "Zu Hause ist niemand.",
    "ar_sy": "ما في حَدا بالبيت."
   }
  ],
  "hints": {
   "en": "English uses a separate verb (am/is/are); Turkish glues it onto the end of the word as a personal ending and usually drops it in the 3rd person (o hasta = 'he is ill'). 'There is/are' is the single word 'var', placed at the very end of the sentence, and its negative is 'yok', not 'değil'.",
   "ru": "Главная ошибка русскоговорящих — забыть личное окончание: по-русски связку «быть» в настоящем не произносят, а по-турецки её опустить нельзя (нужно «hastayım», а не просто «hasta», если речь идёт о «я»). Второй капкан — два разных «нет»: «он не болен» — это hasta değil (değil стоит после слова), но «дома нет молока» — süt yok, а не süt değil! И запомните: var/yok всегда уходят в самый конец фразы, а вопросительная частица mı/mi пишется отдельным словом.",
   "de": "Deutsch konjugiert 'sein' als eigenes Wort vor dem Adjektiv; Türkisch hängt die Endung ans Wortende und setzt die Verneinung 'değil' danach, nicht davor. 'Es gibt' ist das eine Wort 'var' am Satzende, sein Gegenteil ist 'yok' (nicht 'değil').",
   "ar_sy": "بالعربي الجملة الاسمية ما إلها فعل كون، بس بالتركي لازم تحط لاحقة شخص بآخر الكلمة (إلا الغالب بصيغة الغائب بينحذف). النفي كلمة 'değil' بتجي بعد الصفة، و'fīh / mā fīh' بيقابلهن 'var / yok' بس بيجو بآخر الجملة."
  }
 },
 {
  "id": "present-continuous",
  "icon": "⏳",
  "level": "A1",
  "title": {
   "tr": "Şimdiki Zaman -(ı)yor",
   "en": "Present Continuous -(ı)yor",
   "ru": "Настоящее продолженное время -(ı)yor",
   "de": "Präsens (Verlaufsform) -(ı)yor",
   "ar_sy": "المضارع المستمر -(ı)yor"
  },
  "intro": {
   "tr": "-(ı)yor eki hem şu anda olan bir işi (\"şimdi yapıyorum\") hem de genel/alışkanlık olan işleri anlatır. Fiil köküne ekleriz: sesli harften sonra doğrudan -yor, sessiz harften sonra araya ı/i/u/ü koyarız (yap-ı-yor, gel-i-yor). Sonra kişi eki gelir.",
   "en": "The suffix -(ı)yor describes an action happening right now (\"I'm doing it now\") and also general or habitual actions. It attaches to the verb stem: after a vowel just -yor, after a consonant a linking vowel ı/i/u/ü is added (yap-ı-yor, gel-i-yor). Then comes the personal ending.",
   "ru": "Суффикс -(ı)yor — главное «рабочее» время турецкого: он передаёт и действие прямо сейчас («сейчас читаю»), и регулярное, привычное действие («каждый день читаю»). Присоединяется к основе глагола: если основа оканчивается на согласную, между ней и -yor вставляется соединительная гласная по гармонии (yap-ı-yor, gel-i-yor); если на гласную — без вставки (oku-yor). Само -yor никогда не изменяется, а в конце добавляется личное окончание (-um, -sun, -uz и т. д.).",
   "de": "Das Suffix -(ı)yor beschreibt eine Handlung, die gerade jetzt geschieht (\"ich mache es jetzt\"), und auch allgemeine oder gewohnheitsmäßige Handlungen. Es wird an den Verbstamm gehängt: nach einem Vokal nur -yor, nach einem Konsonanten ein Bindevokal ı/i/u/ü (yap-ı-yor, gel-i-yor). Danach folgt die Personalendung.",
   "ar_sy": "اللاحقة -(ı)yor بتعبّر عن شي عم يصير هلق (\"عم اعمل هلق\") وكمان عن شغلات عامة أو عادة. بتنلزق بجذر الفعل: بعد الحركة بس -yor، وبعد الحرف الساكن منحط حركة وصل ı/i/u/ü (yap-ı-yor، gel-i-yor). وبعدين بتجي لاحقة الشخص."
  },
  "tables": [
   {
    "caption": {
     "tr": "Olumlu: gelmek (gel-)",
     "en": "Affirmative: gelmek (to come)",
     "ru": "Утвердительная форма: gelmek (приходить)",
     "de": "Bejahung: gelmek (kommen)",
     "ar_sy": "المثبت: gelmek (يجي)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "Biçim",
      "en": "Form",
      "ru": "Форма",
      "de": "Form",
      "ar_sy": "الصيغة"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "geliyorum"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "geliyorsun"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она/оно",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "geliyor"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "geliyoruz"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl./formal)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "geliyorsunuz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "geliyorlar"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Olumsuz: -mı/-mi/-mu/-mü + yor",
     "en": "Negative: -mı/-mi/-mu/-mü + yor",
     "ru": "Отрицание: -mı/-mi/-mu/-mü + yor",
     "de": "Verneinung: -mı/-mi/-mu/-mü + yor",
     "ar_sy": "النفي: -mı/-mi/-mu/-mü + yor"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "Biçim",
      "en": "Form",
      "ru": "Форма",
      "de": "Form",
      "ar_sy": "الصيغة"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelmiyorum"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gelmiyorsun"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она/оно",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelmiyor"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gelmiyoruz"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl./formal)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gelmiyorsunuz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelmiyorlar"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Soru: ... mu? (ayrı yazılır)",
     "en": "Question: ... mu? (written separately)",
     "ru": "Вопрос: ... mu? (пишется отдельно)",
     "de": "Frage: ... mu? (getrennt geschrieben)",
     "ar_sy": "السؤال: ... mu? (بتنكتب منفصلة)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "Biçim",
      "en": "Form",
      "ru": "Форма",
      "de": "Form",
      "ar_sy": "الصيغة"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "geliyor muyum?"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "geliyor musun?"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она/оно",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "geliyor mu?"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "geliyor muyuz?"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl./formal)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "geliyor musunuz?"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "geliyorlar mı?"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Şimdi kitap okuyorum.",
    "en": "I'm reading a book now.",
    "ru": "Сейчас я читаю книгу.",
    "de": "Ich lese gerade ein Buch.",
    "ar_sy": "هلق عم اقرا كتاب."
   },
   {
    "tr": "Ali her gün okula gidiyor.",
    "en": "Ali goes to school every day.",
    "ru": "Али каждый день ходит в школу.",
    "de": "Ali geht jeden Tag zur Schule.",
    "ar_sy": "علي كل يوم عم يروح عالمدرسة."
   },
   {
    "tr": "Ben et yemiyorum.",
    "en": "I don't eat meat.",
    "ru": "Я не ем мясо.",
    "de": "Ich esse kein Fleisch.",
    "ar_sy": "أنا ما بوكل لحمة."
   },
   {
    "tr": "Nereye gidiyorsun?",
    "en": "Where are you going?",
    "ru": "Куда ты идёшь?",
    "de": "Wohin gehst du?",
    "ar_sy": "لوين رايح؟"
   },
   {
    "tr": "Türkçe öğreniyor musun?",
    "en": "Are you learning Turkish?",
    "ru": "Ты учишь турецкий?",
    "de": "Lernst du Türkisch?",
    "ar_sy": "عم تتعلّم تركي؟"
   }
  ],
  "hints": {
   "en": "Turkish uses this one tense for both \"I am reading\" and \"I read (regularly)\" — don't look for a separate simple present. Also note the linking vowel changes with vowel harmony (yapıyor, geliyor, okuyor, görüyor).",
   "ru": "Одно время покрывает и «читаю сейчас», и «читаю вообще» — привычного русского деления на совершенный/несовершенный вид тут нет, не ищите отдельную форму. Две типичные ошибки русскоговорящих: (1) по гармонии меняется только соединительная гласная (yapıyor, geliyor, okuyor, görüyor), а само -yor всегда остаётся -yor, без вариантов; (2) если основа оканчивается на -a/-e, эта гласная превращается в ı/i/u/ü: bekle- → bekliyor, başla- → başlıyor, yıka- → yıkıyor.",
   "de": "Türkisch benutzt diese eine Zeitform sowohl für \"ich lese gerade\" als auch für \"ich lese (gewöhnlich)\" — es gibt keine getrennte Verlaufsform wie im Englischen. Achten Sie auf den Bindevokal, der der Vokalharmonie folgt (yapıyor, geliyor, okuyor, görüyor).",
   "ar_sy": "التركي بيستعمل نفس الزمن للشي اللي عم يصير هلق وللعادة (عم اقرا / بقرا عادةً) — مافي زمنين منفصلين متل العربي. وانتبه: النفي بيجي بحرف تنين m (gelmiyor) والسؤال mu بتنكتب لحالها بعد الفعل."
  }
 },
 {
  "id": "possessive",
  "icon": "🔑",
  "level": "A1",
  "title": {
   "tr": "İyelik Ekleri",
   "en": "Possessive Suffixes",
   "ru": "Притяжательные аффиксы",
   "de": "Possessivsuffixe",
   "ar_sy": "لواحق الملكية"
  },
  "intro": {
   "tr": "Türkçede \"benim, senin, onun\" için ayrı kelime yerine isme bir ek eklenir: evim, evin, evi. Ek, kelimenin son sesli harfine göre uyum yapar. Bir şeyin sahibini söylerken hem sahibe -in eki hem de eşyaya iyelik eki gelir: Ali'nin evi.",
   "en": "Instead of a separate word for \"my, your, his\", Turkish adds a suffix to the noun: evim (my house), evin (your house), evi (his/her house). The vowel of the suffix harmonises with the noun. To say who owns something, the owner takes -in and the thing takes the possessive suffix: Ali'nin evi (Ali's house).",
   "ru": "В русском есть отдельные слова «мой, твой, его», которые ещё и склоняются по роду, числу и падежу. Турецкий устроен иначе: принадлежность приклеивается прямо к предмету в виде аффикса — evim (мой дом), evin (твой дом), evi (его/её дом). Гласная аффикса меняется по гармонии: ev → evim, но okul → okulum, göz → gözüm. А чтобы назвать конкретного владельца, ставят сразу ДВЕ метки: к владельцу добавляют -in (Ali'nin), а к предмету — притяжательный аффикс (evi). Получается Ali'nin evi, буквально «у-Али его-дом».",
   "de": "Statt eines eigenen Wortes für \"mein, dein, sein\" hängt das Türkische ein Suffix an das Nomen: evim (mein Haus), evin (dein Haus), evi (sein/ihr Haus). Der Vokal des Suffixes richtet sich nach der Vokalharmonie. Um den Besitzer zu nennen, bekommt er -in und die Sache das Possessivsuffix: Ali'nin evi (Alis Haus).",
   "ar_sy": "بالتركي بدل ما تحط كلمة لحالها لـ \"إلي، إلك، إلو\" بتلزق لاحقة بآخر الاسم: evim (بيتي)، evin (بيتك)، evi (بيتو). حرف العلة بالاحقة بيتبع الانسجام الصوتي. ولمّا بدك تحكي مين صاحب الشي، الصاحب بياخد -in والشي بياخد لاحقة الملكية: Ali'nin evi (بيت علي)."
  },
  "tables": [
   {
    "caption": {
     "tr": "Sessizle biten isim: ev",
     "en": "Noun ending in a consonant: ev (house)",
     "ru": "Существительное на согласный: ev (дом)",
     "de": "Nomen auf Konsonant: ev (Haus)",
     "ar_sy": "اسم بينتهي بحرف ساكن: ev (بيت)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "Biçim",
      "en": "Form",
      "ru": "Форма",
      "de": "Form",
      "ar_sy": "الشكل"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "benim (-im)",
       "en": "my",
       "ru": "мой",
       "de": "mein",
       "ar_sy": "إلي"
      },
      "cells": [
       "evim"
      ]
     },
     {
      "label": {
       "tr": "senin (-in)",
       "en": "your (sg.)",
       "ru": "твой",
       "de": "dein",
       "ar_sy": "إلك"
      },
      "cells": [
       "evin"
      ]
     },
     {
      "label": {
       "tr": "onun (-i)",
       "en": "his/her/its",
       "ru": "его/её",
       "de": "sein/ihr",
       "ar_sy": "إلو/إلها"
      },
      "cells": [
       "evi"
      ]
     },
     {
      "label": {
       "tr": "bizim (-imiz)",
       "en": "our",
       "ru": "наш",
       "de": "unser",
       "ar_sy": "إلنا"
      },
      "cells": [
       "evimiz"
      ]
     },
     {
      "label": {
       "tr": "sizin (-iniz)",
       "en": "your (pl./formal)",
       "ru": "ваш",
       "de": "euer/Ihr",
       "ar_sy": "إلكن"
      },
      "cells": [
       "eviniz"
      ]
     },
     {
      "label": {
       "tr": "onların (-leri)",
       "en": "their",
       "ru": "их",
       "de": "ihr",
       "ar_sy": "إلهن"
      },
      "cells": [
       "evleri"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Sesliyle biten isim: araba (kaynaştırma -s-)",
     "en": "Noun ending in a vowel: araba (car) — buffer -s-",
     "ru": "Существительное на гласный: araba (машина) — вставное -s-",
     "de": "Nomen auf Vokal: araba (Auto) — Bindekonsonant -s-",
     "ar_sy": "اسم بينتهي بحرف علة: araba (سيارة) — حرف الوصل -s-"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "Biçim",
      "en": "Form",
      "ru": "Форма",
      "de": "Form",
      "ar_sy": "الشكل"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "benim",
       "en": "my",
       "ru": "мой",
       "de": "mein",
       "ar_sy": "إلي"
      },
      "cells": [
       "arabam"
      ]
     },
     {
      "label": {
       "tr": "senin",
       "en": "your",
       "ru": "твой",
       "de": "dein",
       "ar_sy": "إلك"
      },
      "cells": [
       "araban"
      ]
     },
     {
      "label": {
       "tr": "onun",
       "en": "his/her",
       "ru": "его/её",
       "de": "sein/ihr",
       "ar_sy": "إلو/إلها"
      },
      "cells": [
       "arabası"
      ]
     },
     {
      "label": {
       "tr": "bizim",
       "en": "our",
       "ru": "наш",
       "de": "unser",
       "ar_sy": "إلنا"
      },
      "cells": [
       "arabamız"
      ]
     },
     {
      "label": {
       "tr": "sizin",
       "en": "your",
       "ru": "ваш",
       "de": "euer/Ihr",
       "ar_sy": "إلكن"
      },
      "cells": [
       "arabanız"
      ]
     },
     {
      "label": {
       "tr": "onların",
       "en": "their",
       "ru": "их",
       "de": "ihr",
       "ar_sy": "إلهن"
      },
      "cells": [
       "arabaları"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "İyelik tamlaması: sahip + eşya",
     "en": "Possessive construction: owner + thing",
     "ru": "Притяжательная конструкция: владелец + предмет",
     "de": "Possessivkonstruktion: Besitzer + Sache",
     "ar_sy": "تركيب الملكية: الصاحب + الشي"
    },
    "labelHeader": {
     "tr": "Anlam",
     "en": "Meaning",
     "ru": "Значение",
     "de": "Bedeutung",
     "ar_sy": "المعنى"
    },
    "columns": [
     {
      "tr": "Tamlama",
      "en": "Phrase",
      "ru": "Словосочетание",
      "de": "Wortgruppe",
      "ar_sy": "التركيب"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "Ali'nin evi",
       "en": "Ali's house",
       "ru": "дом Али",
       "de": "Alis Haus",
       "ar_sy": "بيت علي"
      },
      "cells": [
       "Ali'nin evi"
      ]
     },
     {
      "label": {
       "tr": "öğretmenin kitabı",
       "en": "the teacher's book",
       "ru": "книга учителя",
       "de": "das Buch des Lehrers",
       "ar_sy": "كتاب الأستاذ"
      },
      "cells": [
       "öğretmenin kitabı"
      ]
     },
     {
      "label": {
       "tr": "Ayşe'nin arabası",
       "en": "Ayşe's car",
       "ru": "машина Айше",
       "de": "Ayşes Auto",
       "ar_sy": "سيارة عائشة"
      },
      "cells": [
       "Ayşe'nin arabası"
      ]
     },
     {
      "label": {
       "tr": "çocuğun odası",
       "en": "the child's room",
       "ru": "комната ребёнка",
       "de": "das Zimmer des Kindes",
       "ar_sy": "أوضة الولد"
      },
      "cells": [
       "çocuğun odası"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Bu benim evim.",
    "en": "This is my house.",
    "ru": "Это мой дом.",
    "de": "Das ist mein Haus.",
    "ar_sy": "هاد بيتي."
   },
   {
    "tr": "Senin adın ne?",
    "en": "What is your name?",
    "ru": "Как тебя зовут?",
    "de": "Wie heißt du?",
    "ar_sy": "شو اسمك؟"
   },
   {
    "tr": "Ali'nin arabası çok güzel.",
    "en": "Ali's car is very nice.",
    "ru": "Машина Али очень красивая.",
    "de": "Alis Auto ist sehr schön.",
    "ar_sy": "سيارة علي كتير حلوة."
   },
   {
    "tr": "Bizim öğretmenimiz Türk.",
    "en": "Our teacher is Turkish.",
    "ru": "Наш учитель — турок.",
    "de": "Unser Lehrer ist Türke.",
    "ar_sy": "أستاذنا تركي."
   },
   {
    "tr": "Onların çocukları okulda.",
    "en": "Their children are at school.",
    "ru": "Их дети в школе.",
    "de": "Ihre Kinder sind in der Schule.",
    "ar_sy": "ولادهن بالمدرسة."
   }
  ],
  "hints": {
   "en": "Unlike English, the possessor word (benim, senin) is optional — the suffix alone already shows the person. In \"Ali's house\" both parts change: the owner gets -in (Ali'nin) AND the thing gets a suffix (evi) — double marking English never uses.",
   "ru": "Главная ловушка для русскоговорящих — конструкция «дом Али». Хочется сказать просто «Ali ev», но по-турецки нужны ОБЕ метки: Ali'nin evi. Забыть любую из них — самая частая ошибка. При этом слова benim/senin можно опускать (аффикс на предмете уже показывает лицо), а вот сам аффикс на предмете опускать нельзя. И не забывайте про вставное -s- после гласной: araba → arabası, не «arabaı».",
   "de": "Anders als im Deutschen (mein, dein) steckt der Besitz als Suffix im Nomen selbst, und das Wort benim/senin ist meist weglassbar. Achtung auf die doppelte Markierung: Besitzer mit -in (Alis → Ali'nin) UND Sache mit Suffix (evi).",
   "ar_sy": "الملكية بالتركي متل العربي بتنلزق بآخر الاسم (بيتي = evim)، فهاد سهل عليك. بس انتبه: بتركيب متل \"بيت علي\" لازم تحط علامتين — الصاحب بياخد -in (Ali'nin) والشي كمان بياخد لاحقة (evi)، مو بس وحدة متل العربي."
  }
 },
 {
  "id": "past-definite",
  "icon": "⏪",
  "level": "A1",
  "title": {
   "tr": "Görülen Geçmiş Zaman (-dı)",
   "en": "Definite (Witnessed) Past Tense -dı",
   "ru": "Прошедшее очевидное (категорическое) время -dı",
   "de": "Bestimmte (bezeugte) Vergangenheit -dı",
   "ar_sy": "الماضي المعروف (المشهود) -dı"
  },
  "intro": {
   "tr": "Görülen geçmiş zaman, konuşanın kendi gördüğü, yaşadığı ya da kesin olarak bildiği bitmiş işler için kullanılır. Ek fiil köküne gelir ve ünlü uyumuna göre -dı/-di/-du/-dü, sessiz harften (ç, f, h, k, p, s, ş, t) sonra -tı/-ti/-tu/-tü olur.",
   "en": "The definite past is used for finished actions the speaker witnessed, experienced, or knows for certain. The suffix attaches to the verb stem and follows vowel harmony: -dı/-di/-du/-dü, becoming -tı/-ti/-tu/-tü after a voiceless consonant (ç, f, h, k, p, s, ş, t).",
   "ru": "Прошедшее категорическое (очевидное) время передаёт факт: говорящий сам видел, делал или точно знает, что действие произошло. В русском прошедшее меняется по роду (пошёл / пошла), а в турецком рода нет — o gitti одинаково про мужчину, женщину и предмет. Зато к глаголу лепятся сразу два «слоя»: сначала суффикс времени -dı/-di/-du/-dü (после глухих ç, f, h, k, p, s, ş, t он оглушается в -tı/-ti/-tu/-tü), затем личное окончание — и всё это одно слово: gel-di-m «я пришёл».",
   "de": "Die bestimmte Vergangenheit steht für abgeschlossene Handlungen, die der Sprecher selbst gesehen, erlebt oder sicher weiß. Das Suffix tritt an den Verbstamm und folgt der Vokalharmonie: -dı/-di/-du/-dü, nach stimmlosem Konsonanten (ç, f, h, k, p, s, ş, t) -tı/-ti/-tu/-tü.",
   "ar_sy": "الماضي المعروف بنستعملو للأفعال المنتهية اللي الحكي شافها أو عاشها أو متأكد منها. اللاحقة بتنضاف لجذر الفعل وبتتبع انسجام الحركات: -dı/-di/-du/-dü، وبتصير -tı/-ti/-tu/-tü بعد حرف مهموس (ç, f, h, k, p, s, ş, t)."
  },
  "tables": [
   {
    "caption": {
     "tr": "Kişi ekleri: gelmek (ön ünlü) ve almak (arka ünlü)",
     "en": "Personal endings: gelmek (front vowel) and almak (back vowel)",
     "ru": "Личные окончания: gelmek (передний гласный) и almak (задний гласный)",
     "de": "Personalendungen: gelmek (Vordervokal) und almak (Hintervokal)",
     "ar_sy": "لواحق الأشخاص: gelmek (حركة أمامية) و almak (حركة خلفية)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "gelmek",
      "en": "gelmek (to come)",
      "ru": "gelmek (приходить)",
      "de": "gelmek (kommen)",
      "ar_sy": "gelmek (يجي)"
     },
     {
      "tr": "almak",
      "en": "almak (to take)",
      "ru": "almak (брать)",
      "de": "almak (nehmen)",
      "ar_sy": "almak (ياخد)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "geldim",
       "aldım"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "geldin",
       "aldın"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она/оно",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "geldi",
       "aldı"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "geldik",
       "aldık"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl./formal)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "geldiniz",
       "aldınız"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "geldiler",
       "aldılar"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Sessizden sonra -tı: gitmek ve yapmak",
     "en": "-tı after a voiceless consonant: gitmek and yapmak",
     "ru": "-tı после глухого согласного: gitmek и yapmak",
     "de": "-tı nach stimmlosem Konsonanten: gitmek und yapmak",
     "ar_sy": "-tı بعد حرف مهموس: gitmek و yapmak"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "gitmek",
      "en": "gitmek (to go)",
      "ru": "gitmek (идти)",
      "de": "gitmek (gehen)",
      "ar_sy": "gitmek (يروح)"
     },
     {
      "tr": "yapmak",
      "en": "yapmak (to do)",
      "ru": "yapmak (делать)",
      "de": "yapmak (machen)",
      "ar_sy": "yapmak (يعمل)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gittim",
       "yaptım"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gittin",
       "yaptın"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она/оно",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gitti",
       "yaptı"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gittik",
       "yaptık"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Olumsuz ve soru: gelmek",
     "en": "Negative and question: gelmek",
     "ru": "Отрицание и вопрос: gelmek",
     "de": "Verneinung und Frage: gelmek",
     "ar_sy": "النفي والسؤال: gelmek"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "Olumsuz",
      "en": "Negative",
      "ru": "Отрицание",
      "de": "Verneinung",
      "ar_sy": "النفي"
     },
     {
      "tr": "Soru",
      "en": "Question",
      "ru": "Вопрос",
      "de": "Frage",
      "ar_sy": "السؤال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelmedim",
       "geldim mi?"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gelmedin",
       "geldin mi?"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она/оно",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelmedi",
       "geldi mi?"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gelmedik",
       "geldik mi?"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Dün akşam sinemaya gittim.",
    "en": "I went to the cinema last night.",
    "ru": "Вчера вечером я пошёл в кино.",
    "de": "Gestern Abend bin ich ins Kino gegangen.",
    "ar_sy": "مبارح بالليل رحت عالسينما."
   },
   {
    "tr": "Ali kahvaltıda çay içti.",
    "en": "Ali drank tea at breakfast.",
    "ru": "Али пил чай на завтрак.",
    "de": "Ali trank Tee beim Frühstück.",
    "ar_sy": "علي شرب شاي عالفطور."
   },
   {
    "tr": "Dün seni okulda görmedim.",
    "en": "I didn't see you at school yesterday.",
    "ru": "Вчера я не видел тебя в школе.",
    "de": "Ich habe dich gestern nicht in der Schule gesehen.",
    "ar_sy": "مبارح ما شفتك بالمدرسة."
   },
   {
    "tr": "Ödevini yaptın mı?",
    "en": "Did you do your homework?",
    "ru": "Ты сделал домашнее задание?",
    "de": "Hast du deine Hausaufgaben gemacht?",
    "ar_sy": "عملت وظيفتك؟"
   },
   {
    "tr": "Biz geçen yıl İstanbul'a taşındık.",
    "en": "We moved to Istanbul last year.",
    "ru": "В прошлом году мы переехали в Стамбул.",
    "de": "Wir sind letztes Jahr nach Istanbul gezogen.",
    "ar_sy": "نحنا انتقلنا عإسطنبول السنة الماضية."
   }
  ],
  "hints": {
   "en": "One suffix carries both tense and person, so 'I came' is a single word: geldim. Don't add a separate pronoun as a helper — 'ben' is optional and used only for emphasis. Watch the -d- turning into -t- after voiceless consonants (gitti, not *gitdi).",
   "ru": "Три типичные ошибки русскоговорящих. (1) Не оглушают согласную: правильно gitti, yaptım, ettim, а не *gitdi, *yapdım. (2) Забывают про гармонию гласных и клеят одно окончание ко всем глаголам — а нужно geldim, но aldım, но gördüm, но okudum. (3) Всегда подставляют местоимение (ben, sen), хотя лицо уже сидит в самом глаголе (geldi-m = «я»), поэтому ben ставят только для усиления. И не путайте это время с -mış: -dı = «я сам видел / точно знаю», -mış = «говорят / вроде бы». Рода в турецком нет: o geldi — и «он пришёл», и «она пришла».",
   "de": "Anders als im Deutschen gibt es kein Hilfsverb (haben/sein): 'ich bin gekommen' ist ein Wort — geldim. Das Suffix passt sich per Vokalharmonie an (geldim/aldım) und wird nach stimmlosem Konsonanten zu -t- (gitti, nicht *gitdi). Das Pronomen entfällt meist.",
   "ar_sy": "بعكس العربي، الفعل التركي بياخد لاحقة وحدة بتجمع الزمن والشخص، فـ'أنا رحت' كلمة وحدة: gittim. اللاحقة بتتغير حسب انسجام الحركات (geldim/aldım) وبتصير -t- بعد حرف مهموس (gitti مو *gitdi). الضمير عادةً بينحذف."
  }
 },
 {
  "id": "question-particle",
  "icon": "❓",
  "level": "A1",
  "title": {
   "tr": "Soru Eki (mı/mi/mu/mü)",
   "en": "The Question Particle mı",
   "ru": "Вопросительная частица mı",
   "de": "Die Fragepartikel mı",
   "ar_sy": "أداة السؤال mı"
  },
  "intro": {
   "tr": "Evet/hayır sorusu yapmak için cümleye ayrı yazılan soru eki mı/mi/mu/mü eklenir. Ek, kendinden önceki kelimenin son ünlüsüne göre uyum sağlar ve genellikle sorulan kelimenin hemen sonuna gelir. Kişi ekleri de bu ekin üzerine gelir.",
   "en": "To make a yes/no question, Turkish adds the separate question particle mı/mi/mu/mü. It harmonises with the last vowel of the preceding word and usually comes right after the word being asked about. Personal endings attach to this particle.",
   "ru": "Чтобы задать вопрос с ответом «да/нет», турецкий НЕ меняет порядок слов и не добавляет вспомогательных глаголов: предложение остаётся таким же, как в утверждении, а в конец добавляется частица mı/mi/mu/mü — она пишется отдельно, но произносится слитно с предыдущим словом. Её гласная подчиняется гармонии из четырёх вариантов (последняя гласная a/ı → mı, e/i → mi, o/u → mu, ö/ü → mü). Ставится частица сразу после того слова, о котором спрашивают, — именно её место, а не интонация, показывает, что именно под вопросом. Личные окончания приклеиваются к самой частице: miyim, misin, miyiz, misiniz.",
   "de": "Für Ja/Nein-Fragen fügt das Türkische die getrennt geschriebene Fragepartikel mı/mi/mu/mü hinzu. Sie richtet sich nach dem letzten Vokal des vorangehenden Wortes und steht meist direkt hinter dem erfragten Wort. Die Personalendungen hängen sich an diese Partikel an.",
   "ar_sy": "لَتعمِل سؤال جوابو نعم/لأ، التركي بيضيف أداة السؤال mı/mi/mu/mü وبتنكتب لحالها منفصلة. بتنسجم مع آخر حرف علة بالكلمة اللي قبلها، وعادةً بتجي بعد الكلمة اللي عم تسأل عنها مباشرة، ولواحق الضمائر بتنلزق عليها."
  },
  "tables": [
   {
    "caption": {
     "tr": "Ünlü uyumu: son ünlüye göre soru eki",
     "en": "Vowel harmony: the particle by last vowel",
     "ru": "Гармония гласных: частица по последней гласной",
     "de": "Vokalharmonie: die Partikel nach dem letzten Vokal",
     "ar_sy": "انسجام حروف العلة: الأداة حسب آخر حرف علة"
    },
    "labelHeader": {
     "tr": "Son ünlü",
     "en": "Last vowel",
     "ru": "Последняя гласная",
     "de": "Letzter Vokal",
     "ar_sy": "آخر حرف علة"
    },
    "columns": [
     {
      "tr": "Soru eki",
      "en": "Particle",
      "ru": "Частица",
      "de": "Partikel",
      "ar_sy": "الأداة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "a, ı",
       "en": "a, ı",
       "ru": "a, ı",
       "de": "a, ı",
       "ar_sy": "a, ı"
      },
      "cells": [
       "mı",
       "Hazır mı?"
      ]
     },
     {
      "label": {
       "tr": "e, i",
       "en": "e, i",
       "ru": "e, i",
       "de": "e, i",
       "ar_sy": "e, i"
      },
      "cells": [
       "mi",
       "Evde mi?"
      ]
     },
     {
      "label": {
       "tr": "o, u",
       "en": "o, u",
       "ru": "o, u",
       "de": "o, u",
       "ar_sy": "o, u"
      },
      "cells": [
       "mu",
       "Okul mu?"
      ]
     },
     {
      "label": {
       "tr": "ö, ü",
       "en": "ö, ü",
       "ru": "ö, ü",
       "de": "ö, ü",
       "ar_sy": "ö, ü"
      },
      "cells": [
       "mü",
       "Büyük mü?"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Kişi ekleriyle (örnek: öğrenci)",
     "en": "With personal endings (example: öğrenci)",
     "ru": "С личными окончаниями (пример: öğrenci)",
     "de": "Mit Personalendungen (Beispiel: öğrenci)",
     "ar_sy": "مع لواحق الضمائر (مثال: öğrenci)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "Soru biçimi",
      "en": "Question form",
      "ru": "Вопросительная форма",
      "de": "Frageform",
      "ar_sy": "صيغة السؤال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "öğrenci miyim?"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "öğrenci misin?"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "öğrenci mi?"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "öğrenci miyiz?"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl./formal)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "öğrenci misiniz?"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie (Pl.)",
       "ar_sy": "هنّي"
      },
      "cells": [
       "öğrenciler mi?"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Bu senin kitabın mı?",
    "en": "Is this your book?",
    "ru": "Это твоя книга?",
    "de": "Ist das dein Buch?",
    "ar_sy": "هادا كتابك؟"
   },
   {
    "tr": "Ali evde mi?",
    "en": "Is Ali at home?",
    "ru": "Али дома?",
    "de": "Ist Ali zu Hause?",
    "ar_sy": "علي بالبيت؟"
   },
   {
    "tr": "Öğrenci misin?",
    "en": "Are you a student?",
    "ru": "Ты студент?",
    "de": "Bist du Student?",
    "ar_sy": "إنت طالب؟"
   },
   {
    "tr": "Kahve içmek ister misin?",
    "en": "Would you like to drink coffee?",
    "ru": "Хочешь выпить кофе?",
    "de": "Möchtest du einen Kaffee trinken?",
    "ar_sy": "بتحب تشرب قهوة؟"
   },
   {
    "tr": "Türkçe zor mu?",
    "en": "Is Turkish difficult?",
    "ru": "Турецкий сложный?",
    "de": "Ist Türkisch schwer?",
    "ar_sy": "التركي صعب؟"
   }
  ],
  "hints": {
   "en": "Unlike English, Turkish does not change word order or add 'do/does'. It keeps the sentence as-is and adds mı, written as a separate word but pronounced attached. Remember to match its vowel (mı/mi/mu/mü) and attach person endings to it (misin, miyim).",
   "ru": "В русском вопрос часто передаётся одной интонацией («Ты дома?»), поэтому русскоговорящие нередко просто повышают голос и забывают частицу — но по-турецки без mı то же предложение звучит как утверждение. Частица напоминает наше «ли», однако, в отличие от «ли», у неё меняется гласная (mı/mi/mu/mü) и к ней самой цепляются личные окончания (misin, miyim), а не к глаголу или существительному. Пишите её раздельно (evde mi, öğrenci mi) и следите за местом: «Sen mi geldin?» (Это ТЫ пришёл?) и «Sen geldin mi?» (Ты пришёл?) — разные вопросы, потому что частица стоит после разных слов.",
   "de": "Anders als im Deutschen wird der Satz nicht umgestellt (keine Inversion von Verb und Subjekt). Man lässt die Wortstellung wie im Aussagesatz und fügt mı hinzu — getrennt geschrieben, aber gebunden gesprochen, mit passendem Vokal und angehängten Personalendungen (misin).",
   "ar_sy": "بالعربي كتير مرات بنعمل السؤال بالنبرة بس؛ بالتركي لازم تحط الأداة mı. بتنكتب منفصلة بس بتنلفظ ملزوقة، وحرف العلة بيتغير (mı/mi/mu/mü)، ولواحق الضمير بتنلزق عليها (misin, miyim)."
  }
 },
 {
  "id": "negation",
  "icon": "🚫",
  "level": "A1",
  "title": {
   "tr": "Olumsuzluk",
   "en": "Negation",
   "ru": "Отрицание",
   "de": "Verneinung",
   "ar_sy": "النفي"
  },
  "intro": {
   "tr": "Türkçede olumsuzluk üç şekilde yapılır: fiillerde -ma/-me eki, isim ve sıfatlarda değil, olmama/bulunmama için ise yok. Doğru olumsuzu yükleme göre seçersin.",
   "en": "Turkish makes negatives in three ways: the suffix -ma/-me on verbs, değil with nouns and adjectives, and yok for non-existence. You pick the right one according to the predicate.",
   "ru": "В турецком нет одного универсального «не/нет»: отрицание строится тремя разными способами, и выбор зависит от того, что стоит в сказуемом. Если сказуемое — глагол, отрицание вставляется прямо внутрь слова суффиксом -ma/-me (gitmek → gitme-). Если сказуемое — существительное или прилагательное («он учитель», «я устал»), добавляется отдельное слово değil. А для значения «нет, отсутствует» («хлеба нет») используется yok. Сначала определите тип сказуемого — и только потом выбирайте форму отрицания.",
   "de": "Türkisch verneint auf drei Arten: mit dem Suffix -ma/-me beim Verb, mit değil bei Nomen und Adjektiven und mit yok für Nicht-Vorhandensein. Welche Form du wählst, hängt vom Prädikat ab.",
   "ar_sy": "بالتركي في ٣ طرق للنفي: لاحقة -ma/-me عالفعل، وdeğil مع الاسم والصفة، وyok لمعنى «ما في / مو موجود». بتختار الطريقة حسب الخبر بالجملة."
  },
  "tables": [
   {
    "caption": {
     "tr": "Fiil olumsuzu (-ma/-me): gitmek, şimdiki zaman",
     "en": "Verb negation (-ma/-me): gitmek, present tense",
     "ru": "Отрицание глагола (-ma/-me): gitmek, настоящее время",
     "de": "Verbverneinung (-ma/-me): gitmek, Präsens",
     "ar_sy": "نفي الفعل (-ma/-me): gitmek، المضارع"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "Olumsuz biçim",
      "en": "Negative form",
      "ru": "Отрицательная форма",
      "de": "Verneinte Form",
      "ar_sy": "الصيغة المنفية"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gitmiyorum"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gitmiyorsun"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она/оно",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gitmiyor"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gitmiyoruz"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl./formal)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gitmiyorsunuz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gitmiyorlar"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "İsim ve sıfat cümlelerinde: değil",
     "en": "In noun and adjective sentences: değil",
     "ru": "В именных и с прилагательными предложениях: değil",
     "de": "In Nominal- und Adjektivsätzen: değil",
     "ar_sy": "بجمل الاسم والصفة: değil"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "Olumsuz yüklem",
      "en": "Negative predicate",
      "ru": "Отрицательное сказуемое",
      "de": "Verneintes Prädikat",
      "ar_sy": "الخبر المنفي"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "öğretmen değilim"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "hazır değilsin"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она/оно",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "evde değil"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "Türk değiliz"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl./formal)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "hasta değilsiniz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "yorgun değiller"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Var / Yok (bulunma - bulunmama)",
     "en": "Var / Yok (existence - non-existence)",
     "ru": "Var / Yok (наличие - отсутствие)",
     "de": "Var / Yok (Vorhandensein - Nichtvorhandensein)",
     "ar_sy": "Var / Yok (موجود - ما في)"
    },
    "labelHeader": {
     "tr": "Konu",
     "en": "Topic",
     "ru": "Тема",
     "de": "Thema",
     "ar_sy": "الموضوع"
    },
    "columns": [
     {
      "tr": "Olumlu (var)",
      "en": "Affirmative (var)",
      "ru": "Утверждение (var)",
      "de": "Bejaht (var)",
      "ar_sy": "مثبت (var)"
     },
     {
      "tr": "Olumsuz (yok)",
      "en": "Negative (yok)",
      "ru": "Отрицание (yok)",
      "de": "Verneint (yok)",
      "ar_sy": "منفي (yok)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ekmek",
       "en": "bread",
       "ru": "хлеб",
       "de": "Brot",
       "ar_sy": "خبز"
      },
      "cells": [
       "Ekmek var.",
       "Ekmek yok."
      ]
     },
     {
      "label": {
       "tr": "zaman (benim)",
       "en": "time (my)",
       "ru": "время (моё)",
       "de": "Zeit (meine)",
       "ar_sy": "وقت (إلي)"
      },
      "cells": [
       "Zamanım var.",
       "Zamanım yok."
      ]
     },
     {
      "label": {
       "tr": "sorun",
       "en": "problem",
       "ru": "проблема",
       "de": "Problem",
       "ar_sy": "مشكلة"
      },
      "cells": [
       "Sorun var.",
       "Sorun yok."
      ]
     },
     {
      "label": {
       "tr": "para (benim)",
       "en": "money (my)",
       "ru": "деньги (мои)",
       "de": "Geld (mein)",
       "ar_sy": "مصاري (إلي)"
      },
      "cells": [
       "Param var.",
       "Param yok."
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Bugün okula gitmiyorum.",
    "en": "I'm not going to school today.",
    "ru": "Сегодня я не иду в школу.",
    "de": "Heute gehe ich nicht zur Schule.",
    "ar_sy": "اليوم ما عم روح عالمدرسة."
   },
   {
    "tr": "Ben Alman değilim, Türküm.",
    "en": "I'm not German, I'm Turkish.",
    "ru": "Я не немец, я турок.",
    "de": "Ich bin kein Deutscher, ich bin Türke.",
    "ar_sy": "أنا مو ألماني، أنا تركي."
   },
   {
    "tr": "Evde hiç ekmek yok.",
    "en": "There's no bread at all at home.",
    "ru": "Дома совсем нет хлеба.",
    "de": "Zu Hause gibt es überhaupt kein Brot.",
    "ar_sy": "ما في خبز بالبيت أبداً."
   },
   {
    "tr": "Bu çanta senin değil.",
    "en": "This bag isn't yours.",
    "ru": "Эта сумка не твоя.",
    "de": "Diese Tasche gehört dir nicht.",
    "ar_sy": "هالشنطة مو إلك."
   },
   {
    "tr": "Akşam televizyon izlemiyoruz.",
    "en": "We don't watch TV in the evening.",
    "ru": "Вечером мы не смотрим телевизор.",
    "de": "Am Abend sehen wir nicht fern.",
    "ar_sy": "بالمسا ما منتفرّج عالتلفزيون."
   }
  ],
  "hints": {
   "en": "Turkish has three separate negators chosen by predicate type: the suffix -ma/-me inside the verb, değil for 'not + noun/adjective', and yok for 'there isn't'. Don't reach for one all-purpose 'not/don't' as in English. Also note the suffix -ma/-me turns into -mı/-mi/-mu/-mü before the present -yor (gitmiyor, not gitmayor).",
   "ru": "В русском одно «не» подходит и глаголу, и существительному, поэтому русскоговорящие чаще всего ошибаются, пытаясь поставить одно слово-отрицание на все случаи. Держите в голове разделение: глагол отрицается суффиксом ВНУТРИ слова (а не отдельным словом перед ним), существительное и прилагательное — словом değil, а «нет / отсутствует» — словом yok. Нельзя сказать «değil gidiyorum» — только gitmiyorum. И ещё: перед настоящим временем -yor гласная суффикса -ma/-me сужается по гармонии до -mı/-mi/-mu/-mü, поэтому выходит gitmiyor (а не gitmayor), okumuyor (а не okumayor).",
   "de": "Deutsch nutzt 'nicht/kein', Türkisch dagegen drei Mittel: das Suffix -ma/-me im Verb, değil bei Nomen und Adjektiven und yok für 'es gibt nicht'. Die Verbverneinung steckt im Wort, nicht als eigenes Wort davor. Achtung: Vor dem Präsens -yor wird -ma/-me zu -mı/-mi (gitmiyor, nicht gitmayor).",
   "ar_sy": "بالعربي منفي بـ«ما/مو/ما في»، بالتركي في ٣ طرق منفصلة حسب الخبر: لاحقة -ma/-me جوّا الفعل، وdeğil للاسم والصفة، وyok لمعنى «ما في». نفي الفعل بيجي كلاحقة جوّا الكلمة مو كلمة لحالها. وانتبه: قبل المضارع -yor اللاحقة -ma/-me بتصير -mı/-mi (gitmiyor مو gitmayor)."
  }
 },
 {
  "id": "cases",
  "icon": "📦",
  "level": "A2",
  "title": {
   "tr": "İsmin hâlleri",
   "en": "Noun cases",
   "ru": "Падежи существительного",
   "de": "Die Fälle des Substantivs",
   "ar_sy": "حالات الاسم"
  },
  "intro": {
   "tr": "Türkçede ismin hâlleri, ismin cümledeki görevini gösteren eklerdir. Belirtme, yönelme, bulunma, ayrılma ve tamlayan hâlleri isme eklenir ve ünlü uyumuna göre değişir. Ünlüyle biten kelimelerde kaynaştırma harfi olarak -y- (belirtme, yönelme) ya da -n- (tamlayan) kullanılır.",
   "en": "Turkish noun cases are suffixes added to a noun to show its role in the sentence. The accusative, dative, locative, ablative and genitive endings attach to the noun and change according to vowel harmony. When the noun ends in a vowel, a buffer letter -y- (accusative, dative) or -n- (genitive) is inserted.",
   "ru": "Падеж в турецком — это один-единственный суффикс, который приклеивается в конце слова и показывает его роль в предложении. В отличие от русского, где окончание нужно заучивать вместе с типом склонения, здесь достаточно выбрать нужный суффикс и подогнать его гласные под слово по закону гармонии. Самый надёжный способ не ошибиться — задать вопрос: где? — местный (-da), откуда? — исходный (-dan), куда?/кому? — дательный (-a), кого?/что? (об определённом объекте) — винительный (-ı), чей? — родительный (-ın). Если слово кончается на гласную, вставляется соединительная буква -y- (винительный, дательный) или -n- (родительный): arabayı, arabaya, arabanın.",
   "de": "Die türkischen Fälle sind Endungen, die an ein Substantiv gehängt werden und seine Rolle im Satz zeigen. Akkusativ, Dativ, Lokativ, Ablativ und Genitiv treten ans Wort und richten sich nach der Vokalharmonie. Endet das Wort auf einen Vokal, wird ein Puffer-Buchstabe eingefügt: -y- (Akkusativ, Dativ) oder -n- (Genitiv).",
   "ar_sy": "بالتركي حالات الاسم هي لواحق بتنضاف عالاسم لتبيّن دورو بالجملة. لاحقات المفعول والاتجاه والمكان والمصدر والإضافة بتلزق بالكلمة وبتتغيّر حسب انسجام الحركات. لمّا الكلمة تنتهي بحرف علة، بينضاف حرف وصل: -y- (المفعول والاتجاه) أو -n- (الإضافة)."
  },
  "tables": [
   {
    "caption": {
     "tr": "Hâl ekleri ve ünlü uyumu",
     "en": "Case endings and vowel harmony",
     "ru": "Падежные окончания и гармония гласных",
     "de": "Fallendungen und Vokalharmonie",
     "ar_sy": "لواحق الحالات وانسجام الحركات"
    },
    "labelHeader": {
     "tr": "Hâl",
     "en": "Case",
     "ru": "Падеж",
     "de": "Fall",
     "ar_sy": "الحالة"
    },
    "columns": [
     {
      "tr": "Ek",
      "en": "Ending",
      "ru": "Окончание",
      "de": "Endung",
      "ar_sy": "اللاحقة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "Belirtme",
       "en": "Accusative",
       "ru": "Винительный",
       "de": "Akkusativ",
       "ar_sy": "المفعول"
      },
      "cells": [
       "-(y)ı / -(y)i / -(y)u / -(y)ü",
       "evi, kapıyı"
      ]
     },
     {
      "label": {
       "tr": "Yönelme",
       "en": "Dative",
       "ru": "Дательный",
       "de": "Dativ",
       "ar_sy": "الاتجاه"
      },
      "cells": [
       "-(y)a / -(y)e",
       "eve, kapıya"
      ]
     },
     {
      "label": {
       "tr": "Bulunma",
       "en": "Locative",
       "ru": "Местный",
       "de": "Lokativ",
       "ar_sy": "المكان"
      },
      "cells": [
       "-da / -de / -ta / -te",
       "evde, sokakta"
      ]
     },
     {
      "label": {
       "tr": "Ayrılma",
       "en": "Ablative",
       "ru": "Исходный",
       "de": "Ablativ",
       "ar_sy": "المصدر"
      },
      "cells": [
       "-dan / -den / -tan / -ten",
       "evden, sokaktan"
      ]
     },
     {
      "label": {
       "tr": "Tamlayan",
       "en": "Genitive",
       "ru": "Родительный",
       "de": "Genitiv",
       "ar_sy": "الإضافة"
      },
      "cells": [
       "-(n)ın / -(n)in / -(n)un / -(n)ün",
       "evin, kapının"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Örnek isimlerin çekimi",
     "en": "Declension of example nouns",
     "ru": "Склонение существительных на примерах",
     "de": "Deklination von Beispielsubstantiven",
     "ar_sy": "تصريف أسماء نموذجية"
    },
    "labelHeader": {
     "tr": "Hâl",
     "en": "Case",
     "ru": "Падеж",
     "de": "Fall",
     "ar_sy": "الحالة"
    },
    "columns": [
     {
      "tr": "ev",
      "en": "house",
      "ru": "дом",
      "de": "Haus",
      "ar_sy": "بيت"
     },
     {
      "tr": "okul",
      "en": "school",
      "ru": "школа",
      "de": "Schule",
      "ar_sy": "مدرسة"
     },
     {
      "tr": "araba",
      "en": "car",
      "ru": "машина",
      "de": "Auto",
      "ar_sy": "سيارة"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "Yalın",
       "en": "Nominative",
       "ru": "Именительный",
       "de": "Nominativ",
       "ar_sy": "المجرّد"
      },
      "cells": [
       "ev",
       "okul",
       "araba"
      ]
     },
     {
      "label": {
       "tr": "Belirtme",
       "en": "Accusative",
       "ru": "Винительный",
       "de": "Akkusativ",
       "ar_sy": "المفعول"
      },
      "cells": [
       "evi",
       "okulu",
       "arabayı"
      ]
     },
     {
      "label": {
       "tr": "Yönelme",
       "en": "Dative",
       "ru": "Дательный",
       "de": "Dativ",
       "ar_sy": "الاتجاه"
      },
      "cells": [
       "eve",
       "okula",
       "arabaya"
      ]
     },
     {
      "label": {
       "tr": "Bulunma",
       "en": "Locative",
       "ru": "Местный",
       "de": "Lokativ",
       "ar_sy": "المكان"
      },
      "cells": [
       "evde",
       "okulda",
       "arabada"
      ]
     },
     {
      "label": {
       "tr": "Ayrılma",
       "en": "Ablative",
       "ru": "Исходный",
       "de": "Ablativ",
       "ar_sy": "المصدر"
      },
      "cells": [
       "evden",
       "okuldan",
       "arabadan"
      ]
     },
     {
      "label": {
       "tr": "Tamlayan",
       "en": "Genitive",
       "ru": "Родительный",
       "de": "Genitiv",
       "ar_sy": "الإضافة"
      },
      "cells": [
       "evin",
       "okulun",
       "arabanın"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Kitabı masaya koydum.",
    "en": "I put the book on the table.",
    "ru": "Я положил книгу на стол.",
    "de": "Ich habe das Buch auf den Tisch gelegt.",
    "ar_sy": "حطّيت الكتاب عالطاولة."
   },
   {
    "tr": "Okulda Türkçe öğreniyorum.",
    "en": "I'm learning Turkish at school.",
    "ru": "Я учу турецкий в школе.",
    "de": "Ich lerne in der Schule Türkisch.",
    "ar_sy": "عم اتعلّم تركي بالمدرسة."
   },
   {
    "tr": "İstanbul'dan yeni geldim.",
    "en": "I've just arrived from Istanbul.",
    "ru": "Я только что приехал из Стамбула.",
    "de": "Ich bin gerade aus Istanbul gekommen.",
    "ar_sy": "لسا جايي من اسطنبول."
   },
   {
    "tr": "Ali'nin arabası çok güzel.",
    "en": "Ali's car is very nice.",
    "ru": "Машина Али очень красивая.",
    "de": "Alis Auto ist sehr schön.",
    "ar_sy": "سيّارة علي كتير حلوة."
   },
   {
    "tr": "Arkadaşımı bekliyorum.",
    "en": "I'm waiting for my friend.",
    "ru": "Я жду своего друга.",
    "de": "Ich warte auf meinen Freund.",
    "ar_sy": "عم استنّى صاحبي."
   }
  ],
  "hints": {
   "en": "English marks these roles with word order and prepositions (to, in/on, from) plus 's for the possessor; Turkish glues one suffix onto the noun and it changes to match the word's vowels. Note: the accusative ending appears only for a specific/definite object (\"the book\"); an indefinite object takes no ending.",
   "ru": "Не переносите русские падежи на турецкий один в один. Турецкие «куда?» и «кому?» — это один и тот же дательный суффикс -a/-e (eve — «домой», bana — «мне»), хотя в русском это разные падежи. Главная ошибка русскоговорящих — лепить винительный суффикс на любое дополнение: он нужен только для определённого, конкретного объекта («эту книгу» — kitabı), а неопределённый объект идёт вообще без окончания (bir kitap okuyorum — «читаю (какую-то) книгу»). И помните: «где?» — это местный падеж (-da), а не дательный.",
   "de": "Das Deutsche zeigt den Fall über Artikel (den, dem, des); Türkisch hat keine Artikel und hängt die Endung direkt ans Substantiv, angepasst an dessen Vokale. Achtung: Der Akkusativ erscheint nur beim bestimmten Objekt (\"das Buch\"); ein unbestimmtes Objekt bleibt endungslos.",
   "ar_sy": "بالعربي منستعمل حروف جر منفصلة (بـ، من، لـ) وإضافة للملكية؛ بالتركي هالمعاني بتنلزق كلواحق عالاسم وبتتناسب مع حركاتو. انتبه: لاحقة المفعول بتجي بس مع مفعول معرّف (\"الكتاب\")، أما المفعول النكرة فبيضل بدون لاحقة."
  }
 },
 {
  "id": "aorist",
  "icon": "🔁",
  "level": "A2",
  "title": {
   "tr": "Geniş Zaman -(a/ı)r",
   "en": "Aorist (Simple Present) -(a/ı)r",
   "ru": "Настоящее-будущее время (аорист) -(a/ı)r",
   "de": "Aorist (Geniş Zaman) -(a/ı)r",
   "ar_sy": "زمن الـ geniş (المضارع العام) -(a/ı)r"
  },
  "intro": {
   "tr": "Geniş zaman alışkanlıkları, genel doğruları ve isteklilik/rica ifade eder. Fiil kök veya gövdesine -(a/ı)r eki gelir; olumsuzu düzensizdir (-maz/-mez, ama \"ben\" ile -mam/-mem).",
   "en": "The aorist expresses habits, general truths, and willingness or offers. It attaches -(a/ı)r to the verb stem; its negative is irregular (-maz/-mez, but -mam/-mem for \"I\").",
   "ru": "Аорист (широкое время) — форма, которой в русском нет прямого соответствия, поэтому русскоговорящим она даётся труднее всего. Он описывает не то, что идёт прямо сейчас (это -yor), а то, что бывает вообще: привычки, регулярно повторяющиеся действия, общие истины, а также готовность, обещания и вежливые предложения или просьбы. К основе глагола добавляется -(a/ı)r (после гласной просто -r); отрицание образуется нерегулярно: -maz/-mez, но в 1-м лице — -mam/-mem.",
   "de": "Das Aorist drückt Gewohnheiten, allgemeine Wahrheiten und Bereitschaft oder Angebote aus. An den Verbstamm tritt -(a/ı)r; die Verneinung ist unregelmäßig (-maz/-mez, aber -mam/-mem für \"ich\").",
   "ar_sy": "الـ geniş zaman بيعبّر عن العادات والحقائق العامة والاستعداد أو العرض. بينضاف للفعل اللاحقة -(a/ı)r، والنفي شاذ (-maz/-mez، بس -mam/-mem مع \"أنا\")."
  },
  "tables": [
   {
    "caption": {
     "tr": "Olumlu çekim",
     "en": "Positive conjugation",
     "ru": "Утвердительное спряжение",
     "de": "Bejahende Konjugation",
     "ar_sy": "التصريف المثبت"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "gelmek",
      "en": "gelmek (to come)",
      "ru": "gelmek (приходить)",
      "de": "gelmek (kommen)",
      "ar_sy": "gelmek (يجي)"
     },
     {
      "tr": "yazmak",
      "en": "yazmak (to write)",
      "ru": "yazmak (писать)",
      "de": "yazmak (schreiben)",
      "ar_sy": "yazmak (يكتب)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelirim",
       "yazarım"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gelirsin",
       "yazarsın"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelir",
       "yazar"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "geliriz",
       "yazarız"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl.)",
       "ru": "вы",
       "de": "ihr",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gelirsiniz",
       "yazarsınız"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelirler",
       "yazarlar"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Olumsuz: -maz/-mez (gelmek)",
     "en": "Negative: -maz/-mez (gelmek)",
     "ru": "Отрицание: -maz/-mez (gelmek)",
     "de": "Verneinung: -maz/-mez (gelmek)",
     "ar_sy": "النفي: -maz/-mez (gelmek)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "olumsuz biçim",
      "en": "negative form",
      "ru": "отрицательная форма",
      "de": "verneinte Form",
      "ar_sy": "صيغة النفي"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelmem"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gelmezsin"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelmez"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gelmeyiz"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl.)",
       "ru": "вы",
       "de": "ihr",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gelmezsiniz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelmezler"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Soru biçimi (gelmek)",
     "en": "Question form (gelmek)",
     "ru": "Вопросительная форма (gelmek)",
     "de": "Frageform (gelmek)",
     "ar_sy": "صيغة السؤال (gelmek)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "soru biçimi",
      "en": "question form",
      "ru": "вопросительная форма",
      "de": "Frageform",
      "ar_sy": "صيغة السؤال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelir miyim?"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gelir misin?"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelir mi?"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gelir miyiz?"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl.)",
       "ru": "вы",
       "de": "ihr",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gelir misiniz?"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelirler mi?"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Ben her sabah kahve içerim.",
    "en": "I drink coffee every morning.",
    "ru": "Я пью кофе каждое утро.",
    "de": "Ich trinke jeden Morgen Kaffee.",
    "ar_sy": "أنا بشرب قهوة كل صبح."
   },
   {
    "tr": "Dünya, Güneş'in etrafında döner.",
    "en": "The Earth revolves around the Sun.",
    "ru": "Земля вращается вокруг Солнца.",
    "de": "Die Erde dreht sich um die Sonne.",
    "ar_sy": "الأرض بتدور حوالين الشمس."
   },
   {
    "tr": "Et yemem, ben vejetaryenim.",
    "en": "I don't eat meat, I'm a vegetarian.",
    "ru": "Я не ем мясо, я вегетарианец.",
    "de": "Ich esse kein Fleisch, ich bin Vegetarier.",
    "ar_sy": "ما بآكل لحمة، أنا نباتي."
   },
   {
    "tr": "Bir çay içer misin?",
    "en": "Would you like some tea?",
    "ru": "Не выпьешь чаю?",
    "de": "Möchtest du einen Tee?",
    "ar_sy": "بتشرب شاي؟"
   },
   {
    "tr": "Hafta sonu genellikle geç kalkarız.",
    "en": "On the weekend we usually get up late.",
    "ru": "По выходным мы обычно встаём поздно.",
    "de": "Am Wochenende stehen wir meistens spät auf.",
    "ar_sy": "بالويكند عادةً بنفيق متأخر."
   }
  ],
  "hints": {
   "en": "There is no single English tense for the aorist: use the simple present for habits and general truths (\"I drink\"), but it also expresses willingness and offers (\"Would you...?\"). Watch the irregular negative 1st person: gelmem, içmem — not gelmezim.",
   "ru": "Главная ловушка для русскоговорящих — путать аорист с временем на -yor. -yor значит «прямо сейчас, в этот момент» (şu an kahve içiyorum — «сейчас пью»), а аорист — «вообще, обычно» (her sabah kahve içerim — «пью каждое утро»). Русское «я пью» покрывает оба случая, поэтому в турецком каждый раз приходится выбирать, и русскоговорящие по привычке ставят -yor даже там, где нужен аорист. Второе: отрицание 1-го лица без -z — içmem, gelmem, а НЕ «içmezim/gelmezim». И помни, что «Çay içer misin?» — это не «пьёшь ли ты чай вообще», а вежливое предложение «Не выпьешь чаю?».",
   "de": "Es gibt kein einzelnes deutsches Tempus für das Aorist: benutze das Präsens für Gewohnheiten und allgemeine Wahrheiten, aber es steht auch für Bereitschaft und Angebote (\"Möchtest du...?\"). Achtung: unregelmäßige Verneinung in der 1. Person: gelmem, içmem – nicht gelmezim.",
   "ar_sy": "ما في زمن عربي واحد بيقابله: بيعبّر عن العادات والحقائق العامة زي المضارع، وكمان عن الاستعداد والعرض (\"بتشرب شاي؟\"). انتبه للنفي الشاذ بصيغة المتكلم: gelmem وiçmem مو gelmezim."
  }
 },
 {
  "id": "past-reported",
  "icon": "🗣️",
  "level": "A2",
  "title": {
   "tr": "Öğrenilen (duyulan) geçmiş zaman -mış",
   "en": "Reported/evidential past tense -mış",
   "ru": "Прошедшее время на -mış (пересказ/вывод)",
   "de": "Erschlossene Vergangenheit -mış",
   "ar_sy": "الماضي المنقول (-mış)"
  },
  "intro": {
   "tr": "-mış ekini kendi görmediğin, başkasından duyduğun, sonradan fark ettiğin ya da seni şaşırtan olaylar için kullanırsın. Kendi gördüğün (-dı) geçmişin aksine, olaya tanık olmadığını gösterir: \"duydum ki\", \"anlaşılan\", \"meğer\" anlamını taşır.",
   "en": "You use -mış for things you did not witness yourself: things you heard from someone, inferred from evidence, noticed afterwards, or found surprising. Unlike the seen past (-dı), it signals you were not there: it means \"I heard\", \"apparently\", \"it turns out\".",
   "ru": "Аффикс -mış ставится, когда ты сам не был свидетелем события: узнал о нём с чужих слов, догадался по следам, заметил только сейчас или удивлён неожиданному. Он как бы встроен в глагол вместо русских вводных слов «говорят», «оказывается», «видимо», «а он, оказывается…». Сравни: gittim — «я поехал» (знаю сам, был там); gitmiş — «он, говорят / оказывается, уехал» (мне рассказали или я вывел по признакам). В отличие от очевидного прошедшего на -dı, форма на -mış прямо сообщает, что за событие ты не ручаешься лично.",
   "de": "-mış verwendest du für Ereignisse, die du nicht selbst miterlebt hast: von anderen gehört, aus Anzeichen erschlossen, nachträglich bemerkt oder überraschend festgestellt. Anders als die gesehene Vergangenheit (-dı) zeigt es, dass du nicht dabei warst: \"angeblich\", \"anscheinend\", \"offenbar\".",
   "ar_sy": "منستعمل -mış للأشياء يلي ما شفناها بعينّا: سمعناها من حدا، أو استنتجناها من الأدلة، أو انتبهنا إلها بعدين، أو فاجأتنا. عكس الماضي يلي شفناه (-dı)، بيدلّ إنك ما كنت موجود: يعني \"سمعت إنو\"، \"مبيّن\"، \"طلع إنو\"."
  },
  "tables": [
   {
    "caption": {
     "tr": "gelmek fiili: kişi ekleriyle -miş",
     "en": "Verb gelmek: -miş with personal endings",
     "ru": "Глагол gelmek: -miş с личными окончаниями",
     "de": "Verb gelmek: -miş mit Personalendungen",
     "ar_sy": "الفعل gelmek مع لواحق الضمائر -miş"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "Olumlu",
      "en": "Affirmative",
      "ru": "Утвердительная",
      "de": "Bejaht",
      "ar_sy": "مثبت"
     },
     {
      "tr": "Olumsuz",
      "en": "Negative",
      "ru": "Отрицательная",
      "de": "Verneint",
      "ar_sy": "منفي"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelmişim",
       "gelmemişim"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gelmişsin",
       "gelmemişsin"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она/оно",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelmiş",
       "gelmemiş"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gelmişiz",
       "gelmemişiz"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl./formal)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gelmişsiniz",
       "gelmemişsiniz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelmişler",
       "gelmemişler"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Ekin ünlü uyumu: -mış / -miş / -muş / -müş",
     "en": "Vowel harmony of the suffix: -mış / -miş / -muş / -müş",
     "ru": "Гармония гласных суффикса: -mış / -miş / -muş / -müş",
     "de": "Vokalharmonie des Suffixes: -mış / -miş / -muş / -müş",
     "ar_sy": "تناسق الحركات للاحقة: -mış / -miş / -muş / -müş"
    },
    "labelHeader": {
     "tr": "Son ünlü",
     "en": "Last vowel",
     "ru": "Последняя гласная",
     "de": "Letzter Vokal",
     "ar_sy": "آخر حركة"
    },
    "columns": [
     {
      "tr": "Ek",
      "en": "Suffix",
      "ru": "Суффикс",
      "de": "Suffix",
      "ar_sy": "اللاحقة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "a, ı",
       "en": "a, ı",
       "ru": "a, ı",
       "de": "a, ı",
       "ar_sy": "a, ı"
      },
      "cells": [
       "-mış",
       "yapmış"
      ]
     },
     {
      "label": {
       "tr": "e, i",
       "en": "e, i",
       "ru": "e, i",
       "de": "e, i",
       "ar_sy": "e, i"
      },
      "cells": [
       "-miş",
       "gelmiş"
      ]
     },
     {
      "label": {
       "tr": "o, u",
       "en": "o, u",
       "ru": "o, u",
       "de": "o, u",
       "ar_sy": "o, u"
      },
      "cells": [
       "-muş",
       "okumuş"
      ]
     },
     {
      "label": {
       "tr": "ö, ü",
       "en": "ö, ü",
       "ru": "ö, ü",
       "de": "ö, ü",
       "ar_sy": "ö, ü"
      },
      "cells": [
       "-müş",
       "gülmüş"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Gördüğün geçmiş (-dı) ile duyduğun geçmiş (-mış)",
     "en": "Seen past (-dı) vs. reported past (-mış)",
     "ru": "Очевидное прошедшее (-dı) и пересказ (-mış)",
     "de": "Gesehene (-dı) vs. erschlossene Vergangenheit (-mış)",
     "ar_sy": "الماضي المشهود (-dı) مقابل الماضي المنقول (-mış)"
    },
    "columns": [
     {
      "tr": "-dı (gördüm)",
      "en": "-dı (I saw it)",
      "ru": "-dı (я видел)",
      "de": "-dı (ich sah es)",
      "ar_sy": "-dı (شفتها)"
     },
     {
      "tr": "-mış (duydum/anladım)",
      "en": "-mış (heard/inferred)",
      "ru": "-mış (слышал/вывел)",
      "de": "-mış (gehört/erschlossen)",
      "ar_sy": "-mış (سمعت/استنتجت)"
     }
    ],
    "rows": [
     {
      "cells": [
       "Ali geldi.",
       "Ali gelmiş."
      ]
     },
     {
      "cells": [
       "Yağmur yağdı.",
       "Yağmur yağmış."
      ]
     },
     {
      "cells": [
       "Film güzeldi.",
       "Film güzelmiş."
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Ayşe dün İstanbul'a gitmiş, bana arkadaşı söyledi.",
    "en": "Ayşe apparently went to Istanbul yesterday, her friend told me.",
    "ru": "Айше, оказывается, вчера уехала в Стамбул, мне сказала её подруга.",
    "de": "Ayşe ist anscheinend gestern nach Istanbul gefahren, ihre Freundin hat es mir erzählt.",
    "ar_sy": "مبيّن عيشة راحت عإسطنبول مبارح، صاحبتها قالتلي."
   },
   {
    "tr": "Yerler ıslak, gece yağmur yağmış.",
    "en": "The ground is wet, it must have rained during the night.",
    "ru": "Земля мокрая, ночью, видимо, шёл дождь.",
    "de": "Der Boden ist nass, es hat in der Nacht wohl geregnet.",
    "ar_sy": "الأرض مبلّلة، يظهر نزلت شتوة بالليل."
   },
   {
    "tr": "Aa, ne kadar büyümüşsün!",
    "en": "Oh, how you've grown!",
    "ru": "О, как же ты вырос!",
    "de": "Oh, wie groß du geworden bist!",
    "ar_sy": "أوه، شو كبرت!"
   },
   {
    "tr": "Annem küçükken çok yaramazmışım.",
    "en": "According to my mum, I was very naughty as a child.",
    "ru": "Мама говорит, что в детстве я был очень непослушным.",
    "de": "Laut meiner Mutter war ich als Kind sehr frech.",
    "ar_sy": "إمي بتقول لما كنت زغير كنت كتير شقي."
   },
   {
    "tr": "Bebek uyumuş, sessiz olalım.",
    "en": "The baby has fallen asleep (I just noticed), let's be quiet.",
    "ru": "Малыш, оказывается, уснул, давайте потише.",
    "de": "Das Baby ist eingeschlafen (merke ich gerade), seien wir leise.",
    "ar_sy": "مبيّن البيبي نام، خلّينا نسكت."
   }
  ],
  "hints": {
   "en": "English has no verb ending for hearsay or inference: -mış bundles \"I heard\", \"apparently\", \"it must have\" and even surprise into one suffix. Remember that 3rd person singular (o) takes no personal ending (geldi vs gelmiş), and the suffix has four vowel forms.",
   "ru": "В русском нет отдельной глагольной формы для пересказа и вывода — их берут на себя вводные слова, поэтому русскоговорящие по привычке ставят -dı даже там, где о событии только слышали. Правило-подсказка: был свидетелем сам — -dı; пересказываешь чужие слова, говоришь о своём раннем детстве (которого не помнишь) или делаешь вывод по следам — -mış. Не забывай про четыре варианта гласной (-mış/-miş/-muş/-müş) и про то, что в 3-м лице ед. ч. личного окончания нет: gelmiş, а не «gelmişo».",
   "de": "Das Deutsche kennt keine eigene Verbform für Hörensagen: -mış bündelt \"angeblich\", \"anscheinend\", \"offenbar\" und sogar Überraschung in einem Suffix, wo du sonst ein Adverb oder Konjunktiv I bräuchtest. Achte auf die vier Vokalvarianten und darauf, dass die 3. Person Singular keine Personalendung hat.",
   "ar_sy": "بالعربي ما في تصريف خاص للنقل أو الاستنتاج: -mış بيجمع \"بيقولوا\"، \"مبيّن\"، \"يظهر\" وكمان الاستغراب بلاحقة وحدة، بدل ما تزيد كلمة برّا الفعل. انتبه إنو في أربع أشكال للحركة، وإنو الغايب المفرد (o) ما بياخد لاحقة ضمير."
  }
 },
 {
  "id": "future",
  "icon": "⏩",
  "level": "A2",
  "title": {
   "tr": "Gelecek Zaman -(y)ecek/-(y)acak",
   "en": "Future Tense -(y)ecek/-(y)acak",
   "ru": "Будущее время -(y)ecek/-(y)acak",
   "de": "Futur -(y)ecek/-(y)acak",
   "ar_sy": "زمن المستقبل -(y)ecek/-(y)acak"
  },
  "intro": {
   "tr": "Gelecek zaman, ileride yapılacak işleri anlatır. Fiile ünlü uyumuna göre -ecek veya -acak eklenir; ünlüyle biten fiillerde araya -y- girer (bekle-y-ecek). Kişi eki ünlüyle başlayınca sondaki k yumuşayıp ğ olur: geleceğim.",
   "en": "The future tense describes actions that will happen later. Add -ecek or -acak to the verb according to vowel harmony; a buffer -y- appears after vowel-final stems (bekleyecek). Before a vowel ending, the final k softens to ğ: geleceğim.",
   "ru": "Будущее время в турецком передаётся ОДНИМ суффиксом — неважно, скажете вы по-русски «сделаю» или «буду делать»: категории вида здесь нет, форма одна. Вариант -ecek/-acak выбирается по последнему гласному основы (e, i, ö, ü → -ecek; a, ı, o, u → -acak). Если основа кончается на гласный, между ней и суффиксом появляется вставное -y-: bekle → bekleyecek. Дальше идёт личное окончание, и тут главная ловушка: перед окончаниями, начинающимися с гласного (-im у «я», -iz у «мы»), конечное k озвончается в ğ — geleceğim, geleceğiz; а у «ты/вы» дальше идёт согласный, поэтому k сохраняется: geleceksin.",
   "de": "Das Futur beschreibt Handlungen, die später geschehen. An den Verbstamm hängt man je nach Vokalharmonie -ecek oder -acak; nach vokalisch endenden Stämmen tritt ein -y- ein (bekleyecek). Vor einer vokalischen Endung wird das k zu ğ: geleceğim.",
   "ar_sy": "زمن المستقبل بيحكي عن شغلات رح تصير بعدين. منضيف للفعل -ecek أو -acak حسب انسجام الحركات، وإذا الفعل بينتهي بحركة منحط -y- بالنص (bekleyecek). وقبل لاحقة بتبلّش بحركة، الـ k بيصير ğ: geleceğim."
  },
  "tables": [
   {
    "caption": {
     "tr": "Olumlu çekim: gelmek / almak (k → ğ yumuşaması)",
     "en": "Affirmative: gelmek / almak (k → ğ softening)",
     "ru": "Утвердительная форма: gelmek / almak (смягчение k → ğ)",
     "de": "Bejahung: gelmek / almak (k → ğ Erweichung)",
     "ar_sy": "المثبت: gelmek / almak (تليين k → ğ)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "gelmek",
      "en": "to come",
      "ru": "приходить",
      "de": "kommen",
      "ar_sy": "يجي"
     },
     {
      "tr": "almak",
      "en": "to take/buy",
      "ru": "брать/покупать",
      "de": "nehmen/kaufen",
      "ar_sy": "ياخد/يشتري"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "geleceğim",
       "alacağım"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "geleceksin",
       "alacaksın"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelecek",
       "alacak"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "geleceğiz",
       "alacağız"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl.)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "geleceksiniz",
       "alacaksınız"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelecekler",
       "alacaklar"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Olumsuz: -me-/-ma- ekiyle",
     "en": "Negative: with -me-/-ma-",
     "ru": "Отрицание: с -me-/-ma-",
     "de": "Verneinung: mit -me-/-ma-",
     "ar_sy": "النفي: بلاحقة -me-/-ma-"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "gelmek",
      "en": "to come",
      "ru": "приходить",
      "de": "kommen",
      "ar_sy": "يجي"
     },
     {
      "tr": "almak",
      "en": "to take/buy",
      "ru": "брать/покупать",
      "de": "nehmen/kaufen",
      "ar_sy": "ياخد/يشتري"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelmeyeceğim",
       "almayacağım"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gelmeyeceksin",
       "almayacaksın"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelmeyecek",
       "almayacak"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Soru: mi/mı ayrı yazılır",
     "en": "Question: mi/mı written separately",
     "ru": "Вопрос: mi/mı пишется отдельно",
     "de": "Frage: mi/mı wird getrennt geschrieben",
     "ar_sy": "السؤال: mi/mı بتنكتب لحال"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "gelmek",
      "en": "to come",
      "ru": "приходить",
      "de": "kommen",
      "ar_sy": "يجي"
     },
     {
      "tr": "almak",
      "en": "to take/buy",
      "ru": "брать/покупать",
      "de": "nehmen/kaufen",
      "ar_sy": "ياخد/يشتري"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelecek miyim?",
       "alacak mıyım?"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gelecek misin?",
       "alacak mısın?"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она",
       "de": "er/sie/es",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelecek mi?",
       "alacak mı?"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Yarın sinemaya gideceğim.",
    "en": "Tomorrow I will go to the cinema.",
    "ru": "Завтра я пойду в кино.",
    "de": "Morgen werde ich ins Kino gehen.",
    "ar_sy": "بكرا رح روح عالسينما."
   },
   {
    "tr": "Hafta sonu ne yapacaksın?",
    "en": "What will you do at the weekend?",
    "ru": "Что ты будешь делать на выходных?",
    "de": "Was wirst du am Wochenende machen?",
    "ar_sy": "آخر الأسبوع شو رح تعمل؟"
   },
   {
    "tr": "Ali bugün okula gelmeyecek.",
    "en": "Ali won't come to school today.",
    "ru": "Али сегодня не придёт в школу.",
    "de": "Ali wird heute nicht zur Schule kommen.",
    "ar_sy": "علي اليوم ما رح يجي عالمدرسة."
   },
   {
    "tr": "Akşam yemeği yapacak mısın?",
    "en": "Will you cook dinner tonight?",
    "ru": "Ты приготовишь ужин сегодня вечером?",
    "de": "Wirst du heute Abend das Abendessen kochen?",
    "ar_sy": "رح تطبخ العشا الليلة؟"
   },
   {
    "tr": "Gelecek yıl birlikte Türkçe öğreneceğiz.",
    "en": "Next year we will learn Turkish together.",
    "ru": "В следующем году мы вместе будем учить турецкий.",
    "de": "Nächstes Jahr werden wir zusammen Türkisch lernen.",
    "ar_sy": "السنة الجاية رح نتعلّم تركي سوا."
   }
  ],
  "hints": {
   "en": "Turkish uses one future ending -(y)ecek/-(y)acak; there is no separate 'will' vs 'going to' choice. Don't forget the k→ğ softening before the vowel endings: it's geleceğim, not 'gelecekim'.",
   "ru": "Самая частая ошибка русскоговорящих — забыть озвончение k: правильно geleceğim и alacağım, а не «gelecekim / alacakım». Озвончение бывает только у «я» и «мы» (окончание начинается с гласного -ım/-iz); у «ты/вы» k остаётся: geleceksin, geleceksiniz. И не ищите разные формы под вид: «я приду» и «я буду приходить» — это одно и то же geleceğim.",
   "de": "Anders als im Deutschen benutzt man für die Zukunft nicht einfach das Präsens; die Endung -(y)ecek/-(y)acak ist Pflicht. Achte auf k→ğ vor Vokal: geleceğim, nicht 'gelecekim'.",
   "ar_sy": "بالتركي في لاحقة وحدة للمستقبل -(y)ecek/-(y)acak حسب انسجام الحركات، مو زي العربي اللي بتستعمل 'رح' كلمة لحال. ودير بالك: الـ k بيصير ğ قبل الحركة، فمنقول geleceğim مو 'gelecekim'."
  }
 },
 {
  "id": "postpositions",
  "icon": "🔗",
  "level": "A2",
  "title": {
   "tr": "Edatlar",
   "en": "Postpositions",
   "ru": "Послелоги",
   "de": "Postpositionen",
   "ar_sy": "الأدوات اللاحقة (Edatlar)"
  },
  "intro": {
   "tr": "Edatlar bir isimden ya da zamirden SONRA gelir ve onunla birlikte anlam kurar. Bazı edatlar ismi yalın hâlde ister (ile, için, gibi, kadar); bazıları ise hâl eki ister: sonra/önce ayrılma (-den) hâlini, kadar \"-e kadar\" biçiminde yönelme (-e) hâlini alır. Zamirlerle ile, için ve gibi ilgi (iyelik) biçimini kullanır: benimle, benim için, benim gibi.",
   "en": "A postposition comes AFTER the noun or pronoun it belongs to. Some (ile, için, gibi, kadar) take the word in its bare form; others need a case: sonra/önce take the ablative (-den), and kadar meaning \"up to / until\" takes the dative (-e). With pronouns, ile/için/gibi use the genitive form: benimle, benim için, benim gibi.",
   "ru": "В отличие от русских предлогов, турецкий послелог стоит ПОСЛЕ слова: не «с мамой», а «annem-le» (мама + ile). Часть послелогов (ile, için, gibi, kadar) присоединяется к слову в исходной, нулевой форме — без падежного окончания: öğrenci için (для студента), aslan gibi (как лев). Другим нужен падеж: sonra и önce требуют исходный падеж на -den (dersten sonra — после урока), а kadar в значении «до» — дательный на -e (eve kadar — до дома). Главная ловушка: с местоимениями ile/için/gibi берут не начальную форму, а родительную — benim için, а не «ben için».",
   "de": "Eine Postposition steht NACH dem Nomen oder Pronomen. Manche (ile, için, gibi, kadar) verlangen die Grundform; andere einen Fall: sonra/önce den Ablativ (-den) und kadar in der Bedeutung „bis\" den Dativ (-e). Bei Pronomen benutzen ile/için/gibi die Genitivform: benimle, benim için, benim gibi.",
   "ar_sy": "الأداة اللاحقة بتجي بعد الاسم أو الضمير. بعضها (ile, için, gibi, kadar) بياخد الكلمة بصيغتها المجردة، وبعضها بدو حالة معينة: sonra/önce بياخدوا حالة الـ -den، وkadar بمعنى \"لحد/حتى\" بياخد حالة الـ -e. مع الضمائر، ile/için/gibi بيستعملوا صيغة الإضافة: benimle، benim için، benim gibi."
  },
  "tables": [
   {
    "caption": {
     "tr": "Edatlar ve istedikleri hâl",
     "en": "Postpositions and the case they take",
     "ru": "Послелоги и падеж, который они требуют",
     "de": "Postpositionen und ihr Fall",
     "ar_sy": "الأدوات اللاحقة والحالة يلي بدها ياها"
    },
    "labelHeader": {
     "tr": "Edat",
     "en": "Postposition",
     "ru": "Послелог",
     "de": "Postposition",
     "ar_sy": "الأداة"
    },
    "columns": [
     {
      "tr": "İstediği hâl",
      "en": "Case required",
      "ru": "Требуемый падеж",
      "de": "Verlangter Fall",
      "ar_sy": "الحالة المطلوبة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ile",
       "en": "ile (with / by)",
       "ru": "ile (с)",
       "de": "ile (mit)",
       "ar_sy": "ile (مع)"
      },
      "cells": [
       "yalın (–) / -le, -la",
       "Ali ile, otobüsle"
      ]
     },
     {
      "label": {
       "tr": "için",
       "en": "için (for)",
       "ru": "için (для)",
       "de": "için (für)",
       "ar_sy": "için (لأجل)"
      },
      "cells": [
       "yalın (–)",
       "öğrenci için"
      ]
     },
     {
      "label": {
       "tr": "gibi",
       "en": "gibi (like)",
       "ru": "gibi (как)",
       "de": "gibi (wie)",
       "ar_sy": "gibi (متل)"
      },
      "cells": [
       "yalın (–)",
       "aslan gibi"
      ]
     },
     {
      "label": {
       "tr": "kadar",
       "en": "kadar (as…as / until)",
       "ru": "kadar (как / до)",
       "de": "kadar (so…wie / bis)",
       "ar_sy": "kadar (قد / لحد)"
      },
      "cells": [
       "-e / yalın",
       "eve kadar, benim kadar"
      ]
     },
     {
      "label": {
       "tr": "sonra",
       "en": "sonra (after)",
       "ru": "sonra (после)",
       "de": "sonra (nach)",
       "ar_sy": "sonra (بعد)"
      },
      "cells": [
       "-den",
       "dersten sonra"
      ]
     },
     {
      "label": {
       "tr": "önce",
       "en": "önce (before)",
       "ru": "önce (до / перед)",
       "de": "önce (vor)",
       "ar_sy": "önce (قبل)"
      },
      "cells": [
       "-den",
       "yemekten önce"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Zamirlerle: ile / için / gibi (ilgi biçimi)",
     "en": "With pronouns: ile / için / gibi (genitive)",
     "ru": "С местоимениями: ile / için / gibi (родит. форма)",
     "de": "Mit Pronomen: ile / için / gibi (Genitiv)",
     "ar_sy": "مع الضمائر: ile / için / gibi (صيغة الإضافة)"
    },
    "labelHeader": {
     "tr": "Zamir",
     "en": "Pronoun",
     "ru": "Местоимение",
     "de": "Pronomen",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "ile",
      "en": "ile (with)",
      "ru": "ile (с)",
      "de": "ile (mit)",
      "ar_sy": "ile (مع)"
     },
     {
      "tr": "için",
      "en": "için (for)",
      "ru": "için (для)",
      "de": "için (für)",
      "ar_sy": "için (لأجل)"
     },
     {
      "tr": "gibi",
      "en": "gibi (like)",
      "ru": "gibi (как)",
      "de": "gibi (wie)",
      "ar_sy": "gibi (متل)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "ben (I)",
       "ru": "ben (я)",
       "de": "ben (ich)",
       "ar_sy": "ben (أنا)"
      },
      "cells": [
       "benimle",
       "benim için",
       "benim gibi"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "sen (you)",
       "ru": "sen (ты)",
       "de": "sen (du)",
       "ar_sy": "sen (إنتَ/إنتِ)"
      },
      "cells": [
       "seninle",
       "senin için",
       "senin gibi"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "o (he/she/it)",
       "ru": "o (он/она/оно)",
       "de": "o (er/sie/es)",
       "ar_sy": "o (هو/هي)"
      },
      "cells": [
       "onunla",
       "onun için",
       "onun gibi"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "biz (we)",
       "ru": "biz (мы)",
       "de": "biz (wir)",
       "ar_sy": "biz (نحنا)"
      },
      "cells": [
       "bizimle",
       "bizim için",
       "bizim gibi"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "siz (you pl.)",
       "ru": "siz (вы)",
       "de": "siz (ihr/Sie)",
       "ar_sy": "siz (إنتو)"
      },
      "cells": [
       "sizinle",
       "sizin için",
       "sizin gibi"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "onlar (they)",
       "ru": "onlar (они)",
       "de": "onlar (sie Pl.)",
       "ar_sy": "onlar (هنّي)"
      },
      "cells": [
       "onlarla",
       "onlar için",
       "onlar gibi"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "sonra / önce: -den hâli ve zaman",
     "en": "sonra / önce: ablative and time",
     "ru": "sonra / önce: исходный падеж и время",
     "de": "sonra / önce: Ablativ und Zeit",
     "ar_sy": "sonra / önce: حالة -den والزمن"
    },
    "labelHeader": {
     "tr": "Yapı",
     "en": "Structure",
     "ru": "Конструкция",
     "de": "Struktur",
     "ar_sy": "التركيب"
    },
    "columns": [
     {
      "tr": "sonra",
      "en": "sonra (after)",
      "ru": "sonra (после)",
      "de": "sonra (nach)",
      "ar_sy": "sonra (بعد)"
     },
     {
      "tr": "önce",
      "en": "önce (before)",
      "ru": "önce (до)",
      "de": "önce (vor)",
      "ar_sy": "önce (قبل)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "isim + -den",
       "en": "noun + ablative",
       "ru": "имя + исходный падеж",
       "de": "Nomen + Ablativ",
       "ar_sy": "اسم + -den"
      },
      "cells": [
       "yemekten sonra",
       "yemekten önce"
      ]
     },
     {
      "label": {
       "tr": "süre",
       "en": "duration",
       "ru": "срок",
       "de": "Zeitspanne",
       "ar_sy": "مدة"
      },
      "cells": [
       "iki saat sonra",
       "iki saat önce"
      ]
     },
     {
      "label": {
       "tr": "saat",
       "en": "clock time",
       "ru": "время (часы)",
       "de": "Uhrzeit",
       "ar_sy": "الساعة"
      },
      "cells": [
       "saat üçten sonra",
       "saat üçten önce"
      ]
     },
     {
      "label": {
       "tr": "gün / hafta",
       "en": "days / weeks",
       "ru": "дни / недели",
       "de": "Tage / Wochen",
       "ar_sy": "أيام / أسابيع"
      },
      "cells": [
       "üç gün sonra",
       "üç gün önce"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Annemle markete gittim.",
    "en": "I went to the supermarket with my mom.",
    "ru": "Я пошла в магазин с мамой.",
    "de": "Ich bin mit meiner Mutter zum Supermarkt gegangen.",
    "ar_sy": "رحت عالماركت مع إمي."
   },
   {
    "tr": "Bu çiçekler senin için.",
    "en": "These flowers are for you.",
    "ru": "Эти цветы для тебя.",
    "de": "Diese Blumen sind für dich.",
    "ar_sy": "هالورود إلك."
   },
   {
    "tr": "O bir çocuk gibi gülüyor.",
    "en": "He laughs like a child.",
    "ru": "Он смеётся как ребёнок.",
    "de": "Er lacht wie ein Kind.",
    "ar_sy": "عم يضحك متل الولد."
   },
   {
    "tr": "Akşama kadar seni bekledim.",
    "en": "I waited for you until the evening.",
    "ru": "Я ждал тебя до вечера.",
    "de": "Ich habe bis zum Abend auf dich gewartet.",
    "ar_sy": "نطرتك لحد المسا."
   },
   {
    "tr": "Yemekten önce ellerini yıka, yemekten sonra dişlerini fırçala.",
    "en": "Wash your hands before the meal, and brush your teeth after the meal.",
    "ru": "Перед едой помой руки, а после еды почисти зубы.",
    "de": "Wasch dir vor dem Essen die Hände und putz dir nach dem Essen die Zähne.",
    "ar_sy": "غسّل إيديك قبل الأكل، وفرّش سنانك بعد الأكل."
   }
  ],
  "hints": {
   "en": "Turkish postpositions come AFTER the noun, not before it like English prepositions. Watch sonra/önce — they need the ablative -den (dersten sonra = after class), and ile often shrinks onto the word as -le/-la (arkadaşımla = with my friend). With pronouns use the genitive: benimle, benim için, benim gibi.",
   "ru": "Запомните зеркальность: где в русском предлог стоит ПЕРЕД словом, в турецком послелог идёт ПОСЛЕ него. Не ставьте sonra/önce с «голым» словом — им нужен исходный падеж -den: yemekten sonra (после еды), а не «yemek sonra». ile обычно прилипает к слову как -le/-la по гармонии гласных: arkadaşımla (с другом), otobüsle (на автобусе). С местоимениями ile/için/gibi требуют родительной формы — частая ошибка сказать «ben için» или «ben gibi» вместо benim için, benim gibi. И различайте два kadar: «столько же, как» (benim kadar) и «до» с дательным падежом (akşama kadar).",
   "de": "Postpositionen stehen HINTER dem Nomen, nicht davor wie deutsche Präpositionen. sonra/önce fordern den Ablativ (-den): dersten sonra. ile hängt sich oft als -le/-la an: arkadaşımla. Bei Pronomen steht der Genitiv: benimle, benim için, benim gibi — nicht „*ben için\".",
   "ar_sy": "بالتركي هالكلمات بتجي بعد الاسم، عكس العربي يلي حرف الجر بيجي قبل الاسم. sonra/önce بدهن حالة الـ -den (dersten sonra = بعد الدرس)، وile كتير بتلتصق كـ -le/-la (arkadaşımla = مع صاحبي). ومع الضمائر بتستعمل صيغة الإضافة: benimle، benim için، benim gibi."
  }
 },
 {
  "id": "comparatives",
  "icon": "📊",
  "level": "A2",
  "title": {
   "tr": "Karşılaştırma (daha, en, kadar)",
   "en": "Comparison (comparative & superlative)",
   "ru": "Сравнение (сравнительная и превосходная степень)",
   "de": "Vergleich (Komparativ und Superlativ)",
   "ar_sy": "المقارنة (التفضيل)"
  },
  "intro": {
   "tr": "Türkçede sıfatın kendisi değişmez. Daha 'more' anlamı katar, en ise 'the most' demektir. Karşılaştırılan şeye ayrılma hâli (-dan/-den) eklenir: benden uzun. Eşitlik için kadar kullanılır: benim kadar.",
   "en": "In Turkish the adjective itself never changes. Daha means 'more', en means 'the most'. The thing you compare against takes the ablative ending -dan/-den (benden uzun = taller than me), and kadar expresses equality (benim kadar = as … as me).",
   "ru": "В турецком прилагательное НЕ меняет форму: нет отдельных слов вроде «выше» или «самый высокий». «Более» передаётся словом daha, «самый» — словом en; оба ставятся перед прилагательным: daha uzun (выше), en uzun (самый высокий). То, с чем сравнивают, ставится в исходном падеже -dan/-den и идёт ПЕРЕД прилагательным: benden uzun (дословно «от меня высокий» = выше меня). При таком сравнении daha можно опустить. Равенство («такой же…, как») выражается словом kadar: benim kadar çalışkan (такой же трудолюбивый, как я).",
   "de": "Im Türkischen verändert sich das Adjektiv nie. Daha bedeutet 'mehr', en 'am meisten'. Das Vergleichsobjekt bekommt die Ablativendung -dan/-den (benden uzun = größer als ich), und kadar drückt Gleichheit aus (benim kadar = so … wie ich).",
   "ar_sy": "بالتركي الصفة ما بتتغير أبداً. daha معناها 'أكتر' وen معناها 'الأكتر'. الشي يلي عم تقارن فيه بياخد لاحقة المصدر ‑dan/‑den (benden uzun = أطول مني)، وkadar بتعبّر عن المساواة (benim kadar = قدّي)."
  },
  "tables": [
   {
    "caption": {
     "tr": "daha (üstünlük) ve en (en üstünlük)",
     "en": "daha (comparative) and en (superlative)",
     "ru": "daha (сравнительная) и en (превосходная)",
     "de": "daha (Komparativ) und en (Superlativ)",
     "ar_sy": "daha (المقارنة) وen (التفضيل)"
    },
    "labelHeader": {
     "tr": "Sıfat",
     "en": "Adjective",
     "ru": "Прилагательное",
     "de": "Adjektiv",
     "ar_sy": "الصفة"
    },
    "columns": [
     {
      "tr": "daha + sıfat (more)",
      "en": "more",
      "ru": "более",
      "de": "mehr",
      "ar_sy": "أكتر"
     },
     {
      "tr": "en + sıfat (most)",
      "en": "most",
      "ru": "самый",
      "de": "am meisten",
      "ar_sy": "الأكتر"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "büyük",
       "en": "big",
       "ru": "большой",
       "de": "groß",
       "ar_sy": "كبير"
      },
      "cells": [
       "daha büyük",
       "en büyük"
      ]
     },
     {
      "label": {
       "tr": "küçük",
       "en": "small",
       "ru": "маленький",
       "de": "klein",
       "ar_sy": "صغير"
      },
      "cells": [
       "daha küçük",
       "en küçük"
      ]
     },
     {
      "label": {
       "tr": "güzel",
       "en": "beautiful",
       "ru": "красивый",
       "de": "schön",
       "ar_sy": "حلو"
      },
      "cells": [
       "daha güzel",
       "en güzel"
      ]
     },
     {
      "label": {
       "tr": "hızlı",
       "en": "fast",
       "ru": "быстрый",
       "de": "schnell",
       "ar_sy": "سريع"
      },
      "cells": [
       "daha hızlı",
       "en hızlı"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Ayrılma hâli (-dan/-den) = 'than'",
     "en": "Ablative (-dan/-den) = 'than'",
     "ru": "Исходный падеж (-dan/-den) = «чем»",
     "de": "Ablativ (-dan/-den) = 'als'",
     "ar_sy": "لاحقة المصدر (‑dan/‑den) = 'من'"
    },
    "labelHeader": {
     "tr": "Kişi / isim",
     "en": "Person / noun",
     "ru": "Лицо / имя",
     "de": "Person / Nomen",
     "ar_sy": "الشخص / الاسم"
    },
    "columns": [
     {
      "tr": "Ayrılma hâli",
      "en": "Ablative form",
      "ru": "Форма исх. падежа",
      "de": "Ablativform",
      "ar_sy": "صيغة المصدر"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I / me",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "benden",
       "benden uzun"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "senden",
       "senden genç"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he / she",
       "ru": "он / она",
       "de": "er / sie",
       "ar_sy": "هو / هي"
      },
      "cells": [
       "ondan",
       "ondan akıllı"
      ]
     },
     {
      "label": {
       "tr": "bu ev",
       "en": "this house",
       "ru": "этот дом",
       "de": "dieses Haus",
       "ar_sy": "هالبيت"
      },
      "cells": [
       "bu evden",
       "bu evden büyük"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "kadar ile eşitlik (as … as)",
     "en": "Equality with kadar (as … as)",
     "ru": "Равенство с kadar (такой же … как)",
     "de": "Gleichheit mit kadar (so … wie)",
     "ar_sy": "المساواة مع kadar (قدّ …)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "kadar biçimi",
      "en": "kadar form",
      "ru": "форма с kadar",
      "de": "kadar-Form",
      "ar_sy": "صيغة kadar"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I / me",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "benim kadar",
       "benim kadar çalışkan"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "senin kadar",
       "senin kadar hızlı"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he / she",
       "ru": "он / она",
       "de": "er / sie",
       "ar_sy": "هو / هي"
      },
      "cells": [
       "onun kadar",
       "onun kadar güzel"
      ]
     },
     {
      "label": {
       "tr": "Ahmet",
       "en": "Ahmet",
       "ru": "Ахмет",
       "de": "Ahmet",
       "ar_sy": "أحمد"
      },
      "cells": [
       "Ahmet kadar",
       "Ahmet kadar uzun"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Ali benden uzun.",
    "en": "Ali is taller than me.",
    "ru": "Али выше меня.",
    "de": "Ali ist größer als ich.",
    "ar_sy": "علي أطول مني."
   },
   {
    "tr": "Bu araba senin arabandan daha hızlı.",
    "en": "This car is faster than your car.",
    "ru": "Эта машина быстрее твоей машины.",
    "de": "Dieses Auto ist schneller als dein Auto.",
    "ar_sy": "هالسيارة أسرع من سيارتك."
   },
   {
    "tr": "İstanbul, Türkiye'nin en büyük şehri.",
    "en": "Istanbul is the biggest city in Turkey.",
    "ru": "Стамбул — самый большой город Турции.",
    "de": "Istanbul ist die größte Stadt der Türkei.",
    "ar_sy": "إسطنبول أكبر مدينة بتركيا."
   },
   {
    "tr": "Kardeşim benim kadar çalışkan.",
    "en": "My sibling is as hardworking as me.",
    "ru": "Мой брат (моя сестра) такой же трудолюбивый, как я.",
    "de": "Mein Geschwister ist so fleißig wie ich.",
    "ar_sy": "أخي مجتهد قدّي."
   },
   {
    "tr": "Bugün dünden daha soğuk.",
    "en": "Today is colder than yesterday.",
    "ru": "Сегодня холоднее, чем вчера.",
    "de": "Heute ist es kälter als gestern.",
    "ar_sy": "اليوم أبرد من مبارح."
   }
  ],
  "hints": {
   "en": "English 'than' is a separate word; Turkish attaches the ablative -dan/-den to the compared item and puts it first (benden uzun). With the ablative, 'daha' is optional; before 'en' (the superlative) you never add daha.",
   "ru": "Не переводите «чем» отдельным словом и не ставьте объект сравнения после прилагательного, как в русском: правильно benden uzun (не «uzun benden») — исходный падеж -dan/-den идёт первым. Слово daha при этом можно добавить (benden daha uzun) или опустить — смысл тот же. Перед en (превосходная степень) daha НЕ ставится никогда. И запомните разницу с kadar: с местоимениями оно требует родительного падежа (benim kadar, senin kadar, onun kadar), а с именами и существительными — без окончания (Ahmet kadar, bu ev kadar).",
   "de": "Deutsch steigert das Adjektiv selbst (größer, am größten); Türkisch lässt das Adjektiv unverändert und stellt daha bzw. en davor. 'als' entspricht der Ablativendung -dan/-den, nicht einem eigenen Wort.",
   "ar_sy": "بالعربي منستعمل صيغة أفعل (أطول، أكبر)؛ بالتركي الصفة بتضل متل ما هي وبنحط قبلها daha أو en. 'من' يلي بالمقارنة بتصير لاحقة ‑dan/‑den، وللمساواة منستعمل kadar. انتبه: مع الضمير kadar بتاخد صيغة الملكية (benim kadar، senin kadar)."
  }
 },
 {
  "id": "imperative-optative",
  "icon": "📣",
  "level": "A2",
  "title": {
   "tr": "Emir ve İstek Kipi",
   "en": "Imperative and Optative",
   "ru": "Повелительное и желательное наклонение",
   "de": "Imperativ und Optativ (Wunschform)",
   "ar_sy": "صيغة الأمر والطلب"
  },
  "intro": {
   "tr": "Türkçede emir kipiyle birine bir şey yaptırırız: gel (sen), gelin (siz), gelsin (o). İstek kipi -eyim / -elim ise \"yapayım mı, yapalım\" gibi öneri ve niyet anlatır: gideyim (ben), gidelim (biz).",
   "en": "In Turkish the imperative tells someone to do something: gel = come (you), gelin = come (you, polite/plural), gelsin = let him/her come. The optative -eyim / -elim expresses suggestions or intentions for \"I/we\": gideyim = let me go, gidelim = let's go.",
   "ru": "В турецком повелительное наклонение для «ты» — это просто голый глагол без окончания: gel! — «приходи!», otur! — «садись!». Но, в отличие от русского с его двумя формами (иди / идите), турецкий даёт отдельную форму каждому лицу: gel (ты), gelin (вы / вежливо), gelsin (пусть он придёт), gelsinler (пусть они придут). Для «я» и «мы» служит желательное наклонение -eyim / -elim: gideyim — «давай я пойду», gidelim — «давай(те) пойдём». Там, где русский вставляет отдельные слова «пусть» или «давай», турецкий обходится одним окончанием прямо на глаголе.",
   "de": "Im Türkischen fordert der Imperativ jemanden zu etwas auf: gel = komm (du), gelin = kommen Sie/kommt, gelsin = er/sie soll kommen. Der Optativ -eyim / -elim drückt Vorschläge oder Absichten für „ich/wir\" aus: gideyim = ich will/soll gehen, gidelim = lass uns gehen.",
   "ar_sy": "بالتركي صيغة الأمر بتخلّي حدا يعمل شي: gel = تعا (إنت)، gelin = تفضّلوا، gelsin = خلّيه يجي. وصيغة الطلب -eyim / -elim بتعبّر عن اقتراح أو نيّة لـ«أنا/نحنا»: gideyim = خلّيني روح، gidelim = يلّا نروح."
  },
  "tables": [
   {
    "caption": {
     "tr": "Emir kipi",
     "en": "Imperative forms",
     "ru": "Повелительное наклонение",
     "de": "Imperativ",
     "ar_sy": "صيغة الأمر"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "gelmek",
      "en": "to come",
      "ru": "приходить",
      "de": "kommen",
      "ar_sy": "يجي"
     },
     {
      "tr": "gitmek",
      "en": "to go",
      "ru": "идти",
      "de": "gehen",
      "ar_sy": "يروح"
     },
     {
      "tr": "oturmak",
      "en": "to sit",
      "ru": "садиться",
      "de": "sitzen",
      "ar_sy": "يقعُد"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "sen",
       "en": "you (informal)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gel",
       "git",
       "otur"
      ]
     },
     {
      "label": {
       "tr": "siz (çoğul / nazik)",
       "en": "you (plural / polite)",
       "ru": "вы",
       "de": "ihr / Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gelin",
       "gidin",
       "oturun"
      ]
     },
     {
      "label": {
       "tr": "siz (resmî)",
       "en": "you (very formal)",
       "ru": "вы (офиц.)",
       "de": "Sie (sehr förmlich)",
       "ar_sy": "إنتو (رسمي)"
      },
      "cells": [
       "geliniz",
       "gidiniz",
       "oturunuz"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he / she / it",
       "ru": "он / она",
       "de": "er / sie",
       "ar_sy": "هو / هي"
      },
      "cells": [
       "gelsin",
       "gitsin",
       "otursun"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie (Pl.)",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelsinler",
       "gitsinler",
       "otursunlar"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "İstek kipi (öneri): -(y)eyim / -(y)elim",
     "en": "Optative (suggestion): -(y)eyim / -(y)elim",
     "ru": "Желательное наклонение (предложение): -(y)eyim / -(y)elim",
     "de": "Optativ (Vorschlag): -(y)eyim / -(y)elim",
     "ar_sy": "صيغة الطلب (اقتراح): -(y)eyim / -(y)elim"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "gelmek",
      "en": "to come",
      "ru": "приходить",
      "de": "kommen",
      "ar_sy": "يجي"
     },
     {
      "tr": "gitmek",
      "en": "to go",
      "ru": "идти",
      "de": "gehen",
      "ar_sy": "يروح"
     },
     {
      "tr": "oturmak",
      "en": "to sit",
      "ru": "садиться",
      "de": "sitzen",
      "ar_sy": "يقعُد"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "geleyim",
       "gideyim",
       "oturayım"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gelelim",
       "gidelim",
       "oturalım"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Lütfen içeri gelin.",
    "en": "Please come in.",
    "ru": "Пожалуйста, заходите.",
    "de": "Bitte kommen Sie herein.",
    "ar_sy": "من فضلكن تفضّلوا فوتوا لجوّا."
   },
   {
    "tr": "Ali biraz dinlensin.",
    "en": "Let Ali rest a little.",
    "ru": "Пусть Али немного отдохнёт.",
    "de": "Ali soll sich ein bisschen ausruhen.",
    "ar_sy": "خلّي علي يرتاح شوي."
   },
   {
    "tr": "Ben kapıyı açayım mı?",
    "en": "Shall I open the door?",
    "ru": "Мне открыть дверь?",
    "de": "Soll ich die Tür öffnen?",
    "ar_sy": "افتحلك الباب؟"
   },
   {
    "tr": "Hadi sinemaya gidelim!",
    "en": "Come on, let's go to the cinema!",
    "ru": "Давай пойдём в кино!",
    "de": "Komm, lass uns ins Kino gehen!",
    "ar_sy": "يلّا نروح عالسينما!"
   },
   {
    "tr": "Otur ve biraz bekle.",
    "en": "Sit down and wait a bit.",
    "ru": "Сядь и подожди немного.",
    "de": "Setz dich und warte ein bisschen.",
    "ar_sy": "اقعُد واستنّى شوي."
   }
  ],
  "hints": {
   "en": "English commands use the bare verb (Come!), but English has no one-word \"let me / let's\" — Turkish packs those into the ending -eyim / -elim. Also add the polite/plural -in for \"you all\" or formal requests (gelin, geliniz).",
   "ru": "Русский обходится двумя формами (иди / идите), а турецкий различает пять лиц — и это главная ловушка. Голую форму без окончания (gel, otur) говорят только на «ты»; с малознакомым, старшим или в вежливой просьбе она звучит грубо — нужно добавить -in: gelin, oturun. Форму 3-го лица gelsin передавайте через «пусть + глагол» («пусть придёт»), а -eyim / -elim — через «давай(те)», причём местоимение ben или biz добавлять не надо: лицо уже сидит в окончании. Следите за чередованием согласной: git → gidin, gideyim (перед гласной t → d), но gitsin (перед согласной t сохраняется).",
   "de": "Deutsch braucht „soll\" für die 3. Person (er soll kommen) und „lass uns\" für Vorschläge — Türkisch drückt beides mit einer einzigen Endung aus (gelsin, gidelim). Achte auf den Konsonantenwechsel: gitmek → gidin, aber gitsin.",
   "ar_sy": "بالعربي ما في صيغة أمر مباشرة للغايب — بالتركي gelsin يعني «خلّيه يجي»، فبتترجمها بـ«خلّي + فعل». وصيغة -eyim / -elim بتقابل «يلّا نـ...» أو «خلّيني...» مو ضمير لحال."
  }
 },
 {
  "id": "izafet",
  "icon": "🔩",
  "level": "A2",
  "title": {
   "tr": "İzafet (isim tamlaması)",
   "en": "Noun compounds (İzafet)",
   "ru": "Изафет (именные словосочетания)",
   "de": "Nominalkomposita (İzafet)",
   "ar_sy": "الإضافة (تركيب الأسماء)"
  },
  "intro": {
   "tr": "İzafet, iki ismi birbirine bağlamanın yoludur. Belirtisiz izafette baş (ikinci) isim yalnızca -(s)I iyelik eki alır ve bir tür/çeşit anlatır (domates çorbası). Belirtili izafette birinci isim ayrıca -(n)In tamlayan (ilgi) eki alır ve belirli bir sahiplik anlatır (Ali'nin evi).",
   "en": "An izafet links two nouns. The indefinite izafet marks only the head (second) noun with the possessive suffix -(s)I and names a type of thing (domates çorbası \"tomato soup\"). The definite izafet also puts the first noun in the genitive -(n)In and shows specific possession (Ali'nin evi \"Ali's house\").",
   "ru": "Изафет связывает два существительных. Неопределённый (безличный) изафет называет вид или тип предмета: главное — второе — слово получает притяжательное окончание -(s)I, а первое остаётся без изменений (domates çorbası — «томатный суп»). Определённый (притяжательный) изафет выражает принадлежность конкретному хозяину: первое слово ставится в родительный падеж -(n)In, а второе всё равно получает -(s)I (Ali'nin evi — «дом Али»). Запомните: по-турецки помечаются оба слова, тогда как по-русски мы говорим просто «дом Али».",
   "de": "Ein Izafet verbindet zwei Substantive. Beim unbestimmten Izafet erhält nur das zweite (Kopf-)Nomen die Possessivendung -(s)I und benennt eine Art von Sache (domates çorbası „Tomatensuppe\"). Beim bestimmten Izafet steht das erste Nomen zusätzlich im Genitiv -(n)In und drückt konkreten Besitz aus (Ali'nin evi „Alis Haus\").",
   "ar_sy": "الإضافة بتربط اسمين مع بعض. بالإضافة غير المعرّفة، الاسم التاني بس بياخد لاحقة الملكية -(s)I وبتدل على نوع الشي (domates çorbası يعني شوربة بندورة). بالإضافة المعرّفة، الاسم الأول كمان بياخد لاحقة الجر -(n)In وبتدل على ملكية محددة (Ali'nin evi يعني بيت علي)."
  },
  "tables": [
   {
    "caption": {
     "tr": "İki izafet türü",
     "en": "The two izafet types",
     "ru": "Два вида изафета",
     "de": "Die zwei Izafet-Arten",
     "ar_sy": "نوعين الإضافة"
    },
    "columns": [
     {
      "tr": "Tür",
      "en": "Type",
      "ru": "Вид",
      "de": "Art",
      "ar_sy": "النوع"
     },
     {
      "tr": "Yapı",
      "en": "Structure",
      "ru": "Структура",
      "de": "Struktur",
      "ar_sy": "التركيب"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     },
     {
      "tr": "Anlam",
      "en": "Meaning",
      "ru": "Значение",
      "de": "Bedeutung",
      "ar_sy": "المعنى"
     }
    ],
    "rows": [
     {
      "cells": [
       "Belirtisiz izafet",
       "isim + isim-(s)I",
       "domates çorbası",
       "tomato soup / томатный суп"
      ]
     },
     {
      "cells": [
       "Belirtili izafet",
       "isim-(n)In + isim-(s)I",
       "Ali'nin evi",
       "Ali's house / дом Али"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Baş isimdeki -(s)I ekinin ünlü uyumu",
     "en": "Vowel harmony of the head suffix -(s)I",
     "ru": "Гармония окончания -(s)I на главном слове",
     "de": "Vokalharmonie der Kopfendung -(s)I",
     "ar_sy": "انسجام حركات لاحقة -(s)I على الاسم التاني"
    },
    "columns": [
     {
      "tr": "Son ünlü",
      "en": "Last vowel",
      "ru": "Последняя гласная",
      "de": "Letzter Vokal",
      "ar_sy": "آخر حركة"
     },
     {
      "tr": "Ünsüzden sonra",
      "en": "After consonant",
      "ru": "После согласной",
      "de": "Nach Konsonant",
      "ar_sy": "بعد حرف ساكن"
     },
     {
      "tr": "Ünlüden sonra",
      "en": "After vowel",
      "ru": "После гласной",
      "de": "Nach Vokal",
      "ar_sy": "بعد حرف علة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "cells": [
       "e, i",
       "-i",
       "-si",
       "ev → evi / kedi → kedisi"
      ]
     },
     {
      "cells": [
       "a, ı",
       "-ı",
       "-sı",
       "kız → kızı / araba → arabası"
      ]
     },
     {
      "cells": [
       "o, u",
       "-u",
       "-su",
       "okul → okulu / kutu → kutusu"
      ]
     },
     {
      "cells": [
       "ö, ü",
       "-ü",
       "-sü",
       "göz → gözü / köprü → köprüsü"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Bu domates çorbası çok lezzetli.",
    "en": "This tomato soup is very tasty.",
    "ru": "Этот томатный суп очень вкусный.",
    "de": "Diese Tomatensuppe ist sehr lecker.",
    "ar_sy": "هيدا شوربة البندورة كتير طيبة."
   },
   {
    "tr": "Ali'nin evi çok büyük.",
    "en": "Ali's house is very big.",
    "ru": "Дом Али очень большой.",
    "de": "Alis Haus ist sehr groß.",
    "ar_sy": "بيت علي كتير كبير."
   },
   {
    "tr": "Türkçe öğretmeni bugün gelmedi.",
    "en": "The Turkish teacher didn't come today.",
    "ru": "Учитель турецкого сегодня не пришёл.",
    "de": "Der Türkischlehrer ist heute nicht gekommen.",
    "ar_sy": "أستاذ التركي ما إجا اليوم."
   },
   {
    "tr": "Evin kapısı açık.",
    "en": "The door of the house is open.",
    "ru": "Дверь дома открыта.",
    "de": "Die Tür des Hauses ist offen.",
    "ar_sy": "باب البيت مفتوح."
   },
   {
    "tr": "Otobüs durağı nerede?",
    "en": "Where is the bus stop?",
    "ru": "Где автобусная остановка?",
    "de": "Wo ist die Bushaltestelle?",
    "ar_sy": "وين موقف الباص؟"
   }
  ],
  "hints": {
   "en": "Even a \"type of\" compound needs the suffix on the head noun: it is domates çorbası, never domates çorba.",
   "ru": "Типичная ошибка русскоговорящих — забыть окончание -(s)I на втором слове и сказать domates çorba вместо domates çorbası. И не путайте два изафета: есть конкретный владелец — нужен родительный падеж на первом слове (Ali'nin evi); просто вид предмета — только -(s)I (otobüs durağı).",
   "de": "Anders als im Deutschen wird das Kopfnomen immer markiert: domates çorbası, nicht domates çorba.",
   "ar_sy": "متل الإضافة بالعربي (بيت علي)، بس بالتركي لازم كمان تحط لاحقة على الاسم التاني: Ali'nin evi، مو بس Ali ev."
  }
 },
 {
  "id": "ability-necessity",
  "icon": "💪",
  "level": "B1",
  "title": {
   "tr": "Yeterlilik (-abil) ve Gereklilik (-meli)",
   "en": "Ability (-abil) and Necessity (-meli)",
   "ru": "Возможность (-abil) и необходимость (-meli)",
   "de": "Fähigkeit/Möglichkeit (-abil) und Notwendigkeit (-meli)",
   "ar_sy": "القدرة (-abil) والضرورة (-meli)"
  },
  "intro": {
   "tr": "-abil/-ebil bir işi yapabildiğimizi ya da bir şeyin mümkün olduğunu anlatır; olumsuzu -ama/-eme'dir (gelemem). -meli/-malı ise bir işi yapmak zorunda veya mecbur olduğumuzu gösterir (gitmeliyim).",
   "en": "-abil/-ebil says that we are able to do something or that something is possible; its negative is the special form -ama/-eme (gelemem). -meli/-malı shows that we have to or must do something (gitmeliyim).",
   "ru": "Аффикс -abil/-ebil встраивается прямо в глагол и означает «(с)мочь», «уметь» или «это возможно» — отдельного слова вроде русского «мочь» в турецком нет. Его отрицание нерегулярно: это не обычное «не», а особая форма -ama/-eme (gelemem — «не могу прийти»). Аффикс -meli/-malı выражает долженствование и соответствует русскому «должен / надо» (gitmeliyim — «мне надо идти»).",
   "de": "-abil/-ebil drückt aus, dass wir etwas können oder dass etwas möglich ist; die Verneinung ist die Sonderform -ama/-eme (gelemem). -meli/-malı zeigt, dass wir etwas tun müssen (gitmeliyim).",
   "ar_sy": "-abil/-ebil بيقول إنو فينا نعمل شي أو إنو الشي ممكن، ونفيه بيصير بصيغة خاصة -ama/-eme (gelemem). أما -meli/-malı فبيقول إنو لازم نعمل شي (gitmeliyim)."
  },
  "tables": [
   {
    "caption": {
     "tr": "Yeterlilik (olumlu): -abil/-ebil",
     "en": "Ability (affirmative): -abil/-ebil",
     "ru": "Возможность (утвердительная): -abil/-ebil",
     "de": "Fähigkeit (bejaht): -abil/-ebil",
     "ar_sy": "القدرة (مثبت): -abil/-ebil"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "gelmek",
      "en": "gelmek (to come)",
      "ru": "gelmek (приходить)",
      "de": "gelmek (kommen)",
      "ar_sy": "gelmek (يجي)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelebilirim"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gelebilirsin"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she",
       "ru": "он/она",
       "de": "er/sie",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelebilir"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gelebiliriz"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl.)",
       "ru": "вы",
       "de": "ihr",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gelebilirsiniz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelebilirler"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Yetersizlik (olumsuz): -ama/-eme",
     "en": "Inability (negative): -ama/-eme",
     "ru": "Невозможность (отрицание): -ama/-eme",
     "de": "Unfähigkeit (verneint): -ama/-eme",
     "ar_sy": "عدم القدرة (منفي): -ama/-eme"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "gelmek",
      "en": "gelmek (to come)",
      "ru": "gelmek (приходить)",
      "de": "gelmek (kommen)",
      "ar_sy": "gelmek (يجي)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelemem"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gelemezsin"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she",
       "ru": "он/она",
       "de": "er/sie",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gelemez"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gelemeyiz"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl.)",
       "ru": "вы",
       "de": "ihr",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gelemezsiniz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelemezler"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Gereklilik: -meli/-malı",
     "en": "Necessity: -meli/-malı",
     "ru": "Необходимость: -meli/-malı",
     "de": "Notwendigkeit: -meli/-malı",
     "ar_sy": "الضرورة: -meli/-malı"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "gitmek",
      "en": "gitmek (to go)",
      "ru": "gitmek (идти)",
      "de": "gitmek (gehen)",
      "ar_sy": "gitmek (يروح)"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gitmeliyim"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "gitmelisin"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she",
       "ru": "он/она",
       "de": "er/sie",
       "ar_sy": "هو/هي"
      },
      "cells": [
       "gitmeli"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gitmeliyiz"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl.)",
       "ru": "вы",
       "de": "ihr",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gitmelisiniz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gitmeliler"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Bu akşam sana yardım edebilirim.",
    "en": "I can help you this evening.",
    "ru": "Сегодня вечером я могу тебе помочь.",
    "de": "Heute Abend kann ich dir helfen.",
    "ar_sy": "هالمسا فيّي ساعدك."
   },
   {
    "tr": "Maalesef yarın gelemem.",
    "en": "Unfortunately, I can't come tomorrow.",
    "ru": "К сожалению, завтра я не могу прийти.",
    "de": "Leider kann ich morgen nicht kommen.",
    "ar_sy": "للأسف بكرا ما فيّي إجي."
   },
   {
    "tr": "Kız kardeşim çok güzel resim yapabiliyor.",
    "en": "My sister can draw really beautifully.",
    "ru": "Моя сестра умеет очень красиво рисовать.",
    "de": "Meine Schwester kann sehr schön zeichnen.",
    "ar_sy": "أختي بتعرف ترسم كتير حلو."
   },
   {
    "tr": "Şimdi eve gitmeliyim.",
    "en": "I must go home now.",
    "ru": "Сейчас мне надо идти домой.",
    "de": "Ich muss jetzt nach Hause gehen.",
    "ar_sy": "لازم روح عالبيت هلق."
   },
   {
    "tr": "Sınav için çok çalışmalısın.",
    "en": "You must study a lot for the exam.",
    "ru": "Тебе надо много заниматься для экзамена.",
    "de": "Du musst viel für die Prüfung lernen.",
    "ar_sy": "لازم تدرس كتير للامتحان."
   }
  ],
  "hints": {
   "en": "English uses separate modal words (can, must); Turkish attaches them as suffixes to the verb. Watch out for the negative of 'can': it is not a regular 'not' but a special form (gelebilirim → gelemem).",
   "ru": "В русском способность и долженствование — отдельные слова («могу», «умею», «должен»), а в турецком они вшиты в сам глагол как аффикс. Три ловушки для русскоговорящих: (1) «не могу» — это не глагол с «не», а особая форма -ama/-eme (gelebilirim → gelemem, а не «gelmeyebilirim»); (2) в 1-м лице ед. ч. отрицания выпадает показатель -z: правильно gelemem, а не «gelemezim»; (3) у -meli перед личным окончанием появляется буфер -y-: gitmeliyim, а не «gitmelim».",
   "de": "Deutsch benutzt eigene Modalverben (können, müssen) als separate Wörter; Türkisch klebt sie als Suffixe an das Hauptverb. Achtung: das verneinte 'können' ist unregelmäßig (gelebilirim → gelemem).",
   "ar_sy": "بالعربي منستعمل كلمات لحال للقدرة والضرورة (فيني / لازم)، بس بالتركي بينحطوا كلاحقة جوّا الفعل نفسو. وانتبه: نفي 'بقدر' إلو صيغة خاصة مو مثل النفي العادي."
  }
 },
 {
  "id": "conditional",
  "icon": "🔀",
  "level": "B1",
  "title": {
   "tr": "Şart Kipi (-se / -sa)",
   "en": "The Conditional (-se / -sa)",
   "ru": "Условное наклонение (-se / -sa)",
   "de": "Der Konditional (-se / -sa)",
   "ar_sy": "صيغة الشرط (-se / -sa)"
  },
  "intro": {
   "tr": "Şart eki -se/-sa fiile eklenir ve \"...-se, -sa\" (eğer) anlamını verir. Olması mümkün gerçek durumlar için geniş zamanla birleşerek -irse/-arsa olur. Cümlenin başına isteğe bağlı olarak eğer gelebilir; ek zaten şartı taşıdığı için eğer şart değildir.",
   "en": "The conditional suffix -se/-sa attaches to the verb and means \"if\". For real, possible conditions it combines with the aorist to give -irse/-arsa. The word eğer (\"if\") may be added at the start, but since the suffix already carries the meaning, eğer is optional.",
   "ru": "Условие в турецком «прячется» внутри самого глагола: аффикс -se/-sa (после гласных заднего ряда — -sa) присоединяется к основе и уже сам по себе означает «если». Для реальных, вполне возможных условий его добавляют к настоящему-широкому времени (аористу): -ir + -se → -irse/-arsa, например gelirse — «если (он) придёт». «Голая» форма без аориста, например gelse, выражает желание или нереальное условие — «вот бы», «если бы». Слово eğer («если») в начале предложения можно поставить для наглядности, но оно необязательно, ведь смысл несёт сам аффикс.",
   "de": "Das Konditionalsuffix -se/-sa wird an das Verb angehängt und bedeutet \"wenn\". Für reale, mögliche Bedingungen verbindet es sich mit dem Aorist zu -irse/-arsa. Das Wort eğer (\"wenn\") kann am Satzanfang stehen, ist aber optional, da das Suffix die Bedeutung schon trägt.",
   "ar_sy": "لاحقة الشرط -se/-sa بتنلزق بالفعل ومعناها \"إذا\". للحالات الممكنة الحقيقية بتندمج مع صيغة المضارع الواسع فتصير -irse/-arsa. وفي كلمة eğer (\"إذا\") فيك تحطها ببداية الجملة، بس مو ضرورية لأن اللاحقة عم تحمل المعنى."
  },
  "tables": [
   {
    "caption": {
     "tr": "Dilek-şart (istek): gelmek",
     "en": "Wish conditional: gelmek (to come)",
     "ru": "Условно-желательное: gelmek (приходить)",
     "de": "Wunsch-Konditional: gelmek (kommen)",
     "ar_sy": "شرط التمني: gelmek (يجي)"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "Biçim",
      "en": "Form",
      "ru": "Форма",
      "de": "Form",
      "ar_sy": "الصيغة"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelsem"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنتَ / إنتِ"
      },
      "cells": [
       "gelsen"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она",
       "de": "er/sie/es",
       "ar_sy": "هو / هي"
      },
      "cells": [
       "gelse"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gelsek"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl.)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gelseniz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelseler"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Gerçek şart (-irse): gelmek",
     "en": "Real conditional (-irse): gelmek",
     "ru": "Реальное условие (-irse): gelmek",
     "de": "Reale Bedingung (-irse): gelmek",
     "ar_sy": "الشرط الحقيقي (-irse): gelmek"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الضمير"
    },
    "columns": [
     {
      "tr": "Biçim",
      "en": "Form",
      "ru": "Форма",
      "de": "Form",
      "ar_sy": "الصيغة"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "gelirsem"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنتَ / إنتِ"
      },
      "cells": [
       "gelirsen"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она",
       "de": "er/sie/es",
       "ar_sy": "هو / هي"
      },
      "cells": [
       "gelirse"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "gelirsek"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl.)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "gelirseniz"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "gelirlerse"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Ünlü uyumu: -se / -sa",
     "en": "Vowel harmony: -se / -sa",
     "ru": "Гармония гласных: -se / -sa",
     "de": "Vokalharmonie: -se / -sa",
     "ar_sy": "انسجام الحركات: -se / -sa"
    },
    "labelHeader": {
     "tr": "Anlam",
     "en": "Meaning",
     "ru": "Значение",
     "de": "Bedeutung",
     "ar_sy": "المعنى"
    },
    "columns": [
     {
      "tr": "Fiil",
      "en": "Verb",
      "ru": "Глагол",
      "de": "Verb",
      "ar_sy": "الفعل"
     },
     {
      "tr": "Şart",
      "en": "Conditional",
      "ru": "Условие",
      "de": "Konditional",
      "ar_sy": "الشرط"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "gelmek",
       "en": "to come",
       "ru": "приходить",
       "de": "kommen",
       "ar_sy": "يجي"
      },
      "cells": [
       "gelmek",
       "gelse"
      ]
     },
     {
      "label": {
       "tr": "almak",
       "en": "to take",
       "ru": "брать",
       "de": "nehmen",
       "ar_sy": "ياخد"
      },
      "cells": [
       "almak",
       "alsa"
      ]
     },
     {
      "label": {
       "tr": "görmek",
       "en": "to see",
       "ru": "видеть",
       "de": "sehen",
       "ar_sy": "يشوف"
      },
      "cells": [
       "görmek",
       "görse"
      ]
     },
     {
      "label": {
       "tr": "okumak",
       "en": "to read",
       "ru": "читать",
       "de": "lesen",
       "ar_sy": "يقرا"
      },
      "cells": [
       "okumak",
       "okusa"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Yarın hava güzel olursa parka gideriz.",
    "en": "If the weather is nice tomorrow, we'll go to the park.",
    "ru": "Если завтра будет хорошая погода, мы пойдём в парк.",
    "de": "Wenn das Wetter morgen schön ist, gehen wir in den Park.",
    "ar_sy": "إذا الجو حلو بكرا، منروح عالحديقة."
   },
   {
    "tr": "Eğer beni ararsan hemen gelirim.",
    "en": "If you call me, I'll come right away.",
    "ru": "Если ты мне позвонишь, я сразу приду.",
    "de": "Wenn du mich anrufst, komme ich sofort.",
    "ar_sy": "إذا اتصلت فيّي، بجي دغري."
   },
   {
    "tr": "Keşke burada olsan.",
    "en": "I wish you were here.",
    "ru": "Жаль, что тебя здесь нет. / Вот бы ты был здесь.",
    "de": "Ich wünschte, du wärst hier.",
    "ar_sy": "يا ريتك هون."
   },
   {
    "tr": "Param olsa yeni bir araba alırdım.",
    "en": "If I had money, I would buy a new car.",
    "ru": "Если бы у меня были деньги, я бы купил новую машину.",
    "de": "Wenn ich Geld hätte, würde ich ein neues Auto kaufen.",
    "ar_sy": "لو معي مصاري، كنت اشتريت سيارة جديدة."
   },
   {
    "tr": "Zamanın varsa bana yardım eder misin?",
    "en": "If you have time, will you help me?",
    "ru": "Если у тебя есть время, поможешь мне?",
    "de": "Wenn du Zeit hast, hilfst du mir?",
    "ar_sy": "إذا عندك وقت، بتساعدني؟"
   }
  ],
  "hints": {
   "en": "English keeps \"if\" as a separate word; Turkish builds the condition into the verb ending, so eğer is optional and often dropped. Use the aorist form -irse for real conditions (\"if you call\"), and bare -se/-sa for wishes or unreal situations (\"if only\", \"if I had\").",
   "ru": "Типичная ошибка русскоговорящих — сказать eğer, но оставить глагол в обычной форме: в турецком обязателен именно аффикс -se/-sa, а eğer — лишь необязательное усиление, которое можно опустить. Различайте две формы: -irse — реальное условие («если позвонишь — приду»), а чистое -se/-sa — желание или нереальность («вот бы ты был здесь», «были бы деньги — купил бы»); во втором случае часто добавляют keşke («вот бы»).",
   "de": "Im Deutschen steht \"wenn/falls\" getrennt; im Türkischen steckt die Bedingung in der Verbendung, eğer ist daher optional. Reale Bedingung (\"wenn du anrufst\") = Aorist -irse; Wunsch oder Irreales (\"wenn ich doch\", \"wenn ich hätte\") = das reine -se/-sa.",
   "ar_sy": "بالعربي منستعمل \"إذا\" أو \"لو\" ككلمة لحال؛ بالتركي الشرط بينحط بآخر الفعل، فكلمة eğer مو ضرورية. للحالة الممكنة (\"إذا اتصلت\") منستعمل -irse، وللتمني أو المستحيل (\"يا ريت\"، \"لو كان\") منستعمل -se/-sa لحالها."
  }
 },
 {
  "id": "converbs",
  "icon": "🪢",
  "level": "B1",
  "title": {
   "tr": "Zarf-fiiller (ulaçlar): -ken, -ince, -erek, -ip",
   "en": "Converbs: -ken, -ince, -erek, -ip",
   "ru": "Деепричастия: -ken, -ince, -erek, -ip",
   "de": "Konverben (Adverbialformen): -ken, -ince, -erek, -ip",
   "ar_sy": "صيغ الربط (الأحوال): ‏-ken، ‏-ince، ‏-erek، ‏-ip"
  },
  "intro": {
   "tr": "Zarf-fiiller (ulaçlar) iki cümleyi tek fiil çatısında birleştirir ve bağlaç kullanmadan zaman ya da tarz bildirir. -ken 'esnasında', -ince 'olunca', -erek/-arak '...yaparak', -ip ise 'yapıp sonra' anlamı verir; hepsi ana fiilden önce gelir.",
   "en": "Converbs join two clauses onto a single main verb without using a conjunction, showing time or manner. -ken means 'while', -ince means 'when/once', -erek/-arak means 'by (…ing)', and -ip means 'and (then)'. The converb clause always comes before the main verb.",
   "ru": "Деепричастный оборот в турецком заменяет целое придаточное предложение: значение союза уже «упаковано» в суффиксе глагола, поэтому отдельное «когда», «пока» или «и» не нужно. -ken — «пока / в то время как» (одновременное действие); -ince — «когда / как только» (действие сразу за другим); -erek/-arak — «делая что-то / тем, что…» (образ действия); -ip — «сделав и (затем)» (последовательность). Такой оборот всегда стоит перед главным глаголом, и его собственное сказуемое не спрягается по лицам — лицо задаёт только главный глагол.",
   "de": "Konverben verbinden zwei Sätze zu einem Hauptverb, ganz ohne Konjunktion, und drücken Zeit oder Art und Weise aus. -ken heißt 'während', -ince 'wenn/sobald', -erek/-arak 'indem/durch …', -ip 'und (dann)'. Der Nebensatz steht immer vor dem Hauptverb.",
   "ar_sy": "صيغ الربط بتوصل جملتين بفعل واحد بدون أداة ربط، وبتعبّر عن الوقت أو الطريقة. ‏-ken معناها «وقت/بينما»، و‏-ince معناها «لمّا/بمجرد ما»، و‏-erek/-arak معناها «عن طريق/وهو عم»، و‏-ip معناها «و بعدين». الجملة الفرعية دايماً بتجي قبل الفعل الرئيسي."
  },
  "tables": [
   {
    "caption": {
     "tr": "Dört zarf-fiil eki ve anlamları",
     "en": "The four converb suffixes and their meanings",
     "ru": "Четыре деепричастных суффикса и их значения",
     "de": "Die vier Konverb-Suffixe und ihre Bedeutungen",
     "ar_sy": "لاحقات الربط الأربعة ومعانيها"
    },
    "labelHeader": {
     "tr": "Anlam",
     "en": "Meaning",
     "ru": "Значение",
     "de": "Bedeutung",
     "ar_sy": "المعنى"
    },
    "columns": [
     {
      "tr": "Ek",
      "en": "Suffix",
      "ru": "Суффикс",
      "de": "Suffix",
      "ar_sy": "اللاحقة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "iken / esnasında",
       "en": "while",
       "ru": "пока / во время",
       "de": "während",
       "ar_sy": "وقت / بينما"
      },
      "cells": [
       "-ken",
       "yaparken"
      ]
     },
     {
      "label": {
       "tr": "olunca",
       "en": "when / once",
       "ru": "когда / как только",
       "de": "wenn / sobald",
       "ar_sy": "لمّا / بمجرد ما"
      },
      "cells": [
       "-ince / -ınca / -unca / -ünce",
       "gelince"
      ]
     },
     {
      "label": {
       "tr": "...yaparak (tarz)",
       "en": "by (…ing)",
       "ru": "делая / путём",
       "de": "indem / durch …",
       "ar_sy": "عن طريق / وهو عم"
      },
      "cells": [
       "-erek / -arak",
       "koşarak"
      ]
     },
     {
      "label": {
       "tr": "yapıp (sonra)",
       "en": "and (then)",
       "ru": "и (затем)",
       "de": "und (dann)",
       "ar_sy": "و (بعدين)"
      },
      "cells": [
       "-ip / -ıp / -up / -üp",
       "gidip"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "-ken hangi tabana gelir?",
     "en": "What base does -ken attach to?",
     "ru": "К какой основе присоединяется -ken?",
     "de": "An welche Basis tritt -ken?",
     "ar_sy": "‏-ken بتنضاف على أي أساس؟"
    },
    "columns": [
     {
      "tr": "Taban",
      "en": "Base",
      "ru": "Основа",
      "de": "Basis",
      "ar_sy": "الأساس"
     },
     {
      "tr": "-ken'li biçim",
      "en": "Form with -ken",
      "ru": "Форма с -ken",
      "de": "Form mit -ken",
      "ar_sy": "الصيغة مع ‏-ken"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "Fiil (geniş zaman)",
       "en": "Verb (aorist)",
       "ru": "Глагол (аорист)",
       "de": "Verb (Aorist)",
       "ar_sy": "فعل (المضارع العام)"
      },
      "cells": [
       "gelir",
       "gelirken"
      ]
     },
     {
      "label": {
       "tr": "Fiil (geniş zaman)",
       "en": "Verb (aorist)",
       "ru": "Глагол (аорист)",
       "de": "Verb (Aorist)",
       "ar_sy": "فعل (المضارع العام)"
      },
      "cells": [
       "okur",
       "okurken"
      ]
     },
     {
      "label": {
       "tr": "İsim",
       "en": "Noun",
       "ru": "Существительное",
       "de": "Substantiv",
       "ar_sy": "اسم"
      },
      "cells": [
       "çocuk",
       "çocukken"
      ]
     },
     {
      "label": {
       "tr": "İsim (+y)",
       "en": "Noun (+y)",
       "ru": "Существительное (+y)",
       "de": "Substantiv (+y)",
       "ar_sy": "اسم (+y)"
      },
      "cells": [
       "öğrenci",
       "öğrenciyken"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "-ince ekinde dört yönlü ünlü uyumu",
     "en": "Four-way vowel harmony in -ince",
     "ru": "Четырёхвариантная гармония гласных в -ince",
     "de": "Vierfache Vokalharmonie bei -ince",
     "ar_sy": "توافق الحركات الرباعي مع ‏-ince"
    },
    "columns": [
     {
      "tr": "Fiil kökü",
      "en": "Verb stem",
      "ru": "Основа глагола",
      "de": "Verbstamm",
      "ar_sy": "جذر الفعل"
     },
     {
      "tr": "-ince biçimi",
      "en": "-ince form",
      "ru": "Форма -ince",
      "de": "-ince-Form",
      "ar_sy": "صيغة ‏-ince"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "e / i",
       "en": "e / i",
       "ru": "e / i",
       "de": "e / i",
       "ar_sy": "e / i"
      },
      "cells": [
       "gel-",
       "gelince"
      ]
     },
     {
      "label": {
       "tr": "a / ı",
       "en": "a / ı",
       "ru": "a / ı",
       "de": "a / ı",
       "ar_sy": "a / ı"
      },
      "cells": [
       "bak-",
       "bakınca"
      ]
     },
     {
      "label": {
       "tr": "o / u (ünlüden sonra +y)",
       "en": "o / u (+y after vowel)",
       "ru": "o / u (+y после гласной)",
       "de": "o / u (+y nach Vokal)",
       "ar_sy": "o / u (‏+y بعد حرف علة)"
      },
      "cells": [
       "oku-",
       "okuyunca"
      ]
     },
     {
      "label": {
       "tr": "ö / ü",
       "en": "ö / ü",
       "ru": "ö / ü",
       "de": "ö / ü",
       "ar_sy": "ö / ü"
      },
      "cells": [
       "gör-",
       "görünce"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Yemek yaparken müzik dinlerim.",
    "en": "I listen to music while I'm cooking.",
    "ru": "Готовя еду, я слушаю музыку.",
    "de": "Während ich koche, höre ich Musik.",
    "ar_sy": "وقت بطبخ بسمع موسيقى."
   },
   {
    "tr": "Eve gelince beni ara.",
    "en": "Call me when you get home.",
    "ru": "Когда придёшь домой, позвони мне.",
    "de": "Ruf mich an, wenn du nach Hause kommst.",
    "ar_sy": "لمّا توصل عالبيت خابرني."
   },
   {
    "tr": "Çocuk gülerek odaya girdi.",
    "en": "The child came into the room smiling.",
    "ru": "Ребёнок вошёл в комнату, улыбаясь.",
    "de": "Das Kind kam lächelnd ins Zimmer.",
    "ar_sy": "الولد فات عالأوضة وهو عم يضحك."
   },
   {
    "tr": "Markete gidip ekmek aldım.",
    "en": "I went to the shop and bought bread.",
    "ru": "Я сходил в магазин и купил хлеб.",
    "de": "Ich ging zum Supermarkt und kaufte Brot.",
    "ar_sy": "رحت عالدكان وشتريت خبز."
   },
   {
    "tr": "Küçükken çok utangaçtım.",
    "en": "When I was little, I was very shy.",
    "ru": "Когда я был маленьким, я был очень стеснительным.",
    "de": "Als ich klein war, war ich sehr schüchtern.",
    "ar_sy": "لمّا كنت زغير كنت كتير خجول."
   }
  ],
  "hints": {
   "en": "English uses separate words (while / when / by …ing / and), but Turkish packs each into one suffix on the verb, and the whole converb clause comes first. Note -ken attaches to the aorist (gelir → gelirken), not to the dictionary form. -erek/-arak and -ip normally require the same subject in both clauses; -ince and -ken allow a different subject.",
   "ru": "Русские деепричастия (улыбаясь, придя, сделав) ближе всего к -erek/-arak и -ip, а у -ince и особенно -ken прямого деепричастного аналога нет — их естественнее передавать придаточным с «когда/пока». Три типичные ошибки русскоязычных: (1) -ken лепят к словарной форме, хотя нужна основа настоящего-широкого времени: gel-ir → gelirken, а не «gelken»; (2) добавляют лишний союз («ve» или «когда») — в турецком он уже внутри суффикса, дублировать не надо; (3) забывают, что -erek/-arak и -ip требуют одного и того же подлежащего в обеих частях, тогда как при -ince и -ken подлежащие могут быть разными.",
   "de": "Deutsch braucht Konjunktionen (während / wenn / indem / und) plus finites Verb; Türkisch hat keine Konjunktion — die Bedeutung steckt allein im Suffix, und der Nebensatz steht vor dem Hauptverb. -ken tritt an den Aorist (okur → okurken), nicht an den Infinitiv. -erek/-arak und -ip verlangen dasselbe Subjekt in beiden Teilen.",
   "ar_sy": "بالعربي منستعمل أدوات منفصلة (وقت، لمّا، وهو عم، و) مع فعل مستقل، بس بالتركي كل هالمعاني بتنضغط بلاحقة وحدة عالفعل بدون أي أداة ربط، والجملة الفرعية دايماً قبل الفعل الرئيسي. انتبه إنو ‏-erek/-arak و‏-ip لازم يكون الفاعل نفسه بالجملتين، بينما ‏-ince و‏-ken بيسمحوا بفاعل مختلف."
  }
 },
 {
  "id": "participles",
  "icon": "🧩",
  "level": "B1",
  "title": {
   "tr": "Ortaçlar (sıfat-fiiller) ve sıfat cümleleri",
   "en": "Participles and relative clauses",
   "ru": "Причастия и относительные придаточные",
   "de": "Partizipien und Relativsätze",
   "ar_sy": "اسم الفاعل والمفعول (الصفات الفعلية) والجمل الوصفية"
  },
  "intro": {
   "tr": "Türkçede İngilizcedeki 'who, which, that' gibi ilgi zamiri yoktur; onun yerine fiile bir ek getirip onu ismin önüne koyarız. İsim eylemi yapan (özne) ise -en/-an kullanılır (okuyan adam); isim eylemin nesnesi/tümleci ise iyelik ekiyle -dik (okuduğum kitap) ya da gelecek için -ecek (okuyacağım kitap) kullanılır.",
   "en": "Turkish has no relative pronoun like 'who/which/that'; instead you add a suffix to the verb and place it before the noun. Use -en/-an when the noun does the action (the subject: okuyan adam), and -dik or -ecek with a possessive suffix when the noun is the object (okuduğum kitap, okuyacağım kitap).",
   "ru": "В турецком нет слова «который»: русское придаточное сворачивается в одно определение, которое ставится ПЕРЕД существительным, как обычное прилагательное. Главное — определить роль существительного. Если оно само выполняет действие (подлежащее), берём -en/-an: okuyan adam — «читающий человек / человек, который читает». Если оно — объект действия (то, над чем действие совершают), берём -dik (прошлое/настоящее) или -ecek (будущее) с притяжательным суффиксом, а сам деятель ставится в родительном падеже: (benim) okuduğum kitap — «книга, которую я читаю/прочитал».",
   "de": "Das Türkische hat kein Relativpronomen wie „der/die/das“; stattdessen hängt man ein Suffix an das Verb und stellt es vor das Nomen. Ist das Nomen das Subjekt der Handlung, nimmt man -en/-an (okuyan adam); ist es das Objekt, nimmt man -dik oder -ecek mit einem Possessivsuffix (okuduğum kitap, okuyacağım kitap).",
   "ar_sy": "بالتركي ما في ضمير وصل متل 'اللي' بالعربي؛ بدل هيك منزيد لاحقة عالفعل ومنحطّو قبل الاسم. لما الاسم هوّي اللي عم يعمل الشي (فاعل) منستعمل -en/-an (okuyan adam)، ولما يكون مفعول منستعمل -dik أو -ecek مع لاحقة ملكية (okuduğum kitap, okuyacağım kitap)."
  },
  "tables": [
   {
    "caption": {
     "tr": "Özne ortacı: -en / -an (eylemi yapan isim)",
     "en": "Subject participle -en/-an (the noun that does the action)",
     "ru": "Причастие подлежащего -en/-an (существительное-деятель)",
     "de": "Subjektpartizip -en/-an (das handelnde Nomen)",
     "ar_sy": "اسم الفاعل -en/-an (الاسم اللي عم يعمل الشي)"
    },
    "columns": [
     {
      "tr": "Fiil",
      "en": "Verb",
      "ru": "Глагол",
      "de": "Verb",
      "ar_sy": "الفعل"
     },
     {
      "tr": "Ortaç (-en/-an)",
      "en": "Participle (-en/-an)",
      "ru": "Причастие (-en/-an)",
      "de": "Partizip (-en/-an)",
      "ar_sy": "الصفة (-en/-an)"
     }
    ],
    "rows": [
     {
      "cells": [
       "okumak",
       "okuyan"
      ]
     },
     {
      "cells": [
       "gelmek",
       "gelen"
      ]
     },
     {
      "cells": [
       "çalışmak",
       "çalışan"
      ]
     },
     {
      "cells": [
       "yaşamak",
       "yaşayan"
      ]
     },
     {
      "cells": [
       "beklemek",
       "bekleyen"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Nesne ortaçları: -dik (geçmiş/şimdi) ve -ecek (gelecek) + iyelik eki",
     "en": "Object participles: -dik (past/present) and -ecek (future) + possessive suffix",
     "ru": "Причастия дополнения: -dik (прош./наст.) и -ecek (буд.) + притяжательный суффикс",
     "de": "Objektpartizipien: -dik (Vergangenheit/Gegenwart) und -ecek (Zukunft) + Possessivsuffix",
     "ar_sy": "اسم المفعول: -dik (ماضي/حاضر) و -ecek (مستقبل) + لاحقة ملكية"
    },
    "labelHeader": {
     "tr": "Kişi",
     "en": "Person",
     "ru": "Лицо",
     "de": "Person",
     "ar_sy": "الشخص"
    },
    "columns": [
     {
      "tr": "Zamir",
      "en": "Pronoun",
      "ru": "Местоимение",
      "de": "Pronomen",
      "ar_sy": "الضمير"
     },
     {
      "tr": "-dik ortacı",
      "en": "-dik participle",
      "ru": "Причастие на -dik",
      "de": "-dik-Partizip",
      "ar_sy": "صيغة -dik"
     },
     {
      "tr": "-ecek ortacı",
      "en": "-ecek participle",
      "ru": "Причастие на -ecek",
      "de": "-ecek-Partizip",
      "ar_sy": "صيغة -ecek"
     }
    ],
    "rows": [
     {
      "label": {
       "tr": "ben",
       "en": "I",
       "ru": "я",
       "de": "ich",
       "ar_sy": "أنا"
      },
      "cells": [
       "benim",
       "okuduğum",
       "okuyacağım"
      ]
     },
     {
      "label": {
       "tr": "sen",
       "en": "you (sg.)",
       "ru": "ты",
       "de": "du",
       "ar_sy": "إنت"
      },
      "cells": [
       "senin",
       "okuduğun",
       "okuyacağın"
      ]
     },
     {
      "label": {
       "tr": "o",
       "en": "he/she/it",
       "ru": "он/она",
       "de": "er/sie/es",
       "ar_sy": "هوّي/هيّي"
      },
      "cells": [
       "onun",
       "okuduğu",
       "okuyacağı"
      ]
     },
     {
      "label": {
       "tr": "biz",
       "en": "we",
       "ru": "мы",
       "de": "wir",
       "ar_sy": "نحنا"
      },
      "cells": [
       "bizim",
       "okuduğumuz",
       "okuyacağımız"
      ]
     },
     {
      "label": {
       "tr": "siz",
       "en": "you (pl./formal)",
       "ru": "вы",
       "de": "ihr/Sie",
       "ar_sy": "إنتو"
      },
      "cells": [
       "sizin",
       "okuduğunuz",
       "okuyacağınız"
      ]
     },
     {
      "label": {
       "tr": "onlar",
       "en": "they",
       "ru": "они",
       "de": "sie",
       "ar_sy": "هنّي"
      },
      "cells": [
       "onların",
       "okudukları",
       "okuyacakları"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Kitap okuyan adam benim babam.",
    "en": "The man reading a book is my father.",
    "ru": "Мужчина, читающий книгу, — мой отец.",
    "de": "Der Mann, der ein Buch liest, ist mein Vater.",
    "ar_sy": "الرجّال اللي عم يقرا كتاب هوّي بيّي."
   },
   {
    "tr": "Dün gördüğüm film çok güzeldi.",
    "en": "The film I saw yesterday was very good.",
    "ru": "Фильм, который я вчера посмотрел, был очень хорошим.",
    "de": "Der Film, den ich gestern gesehen habe, war sehr gut.",
    "ar_sy": "الفيلم اللي شفتو مبارح كان كتير حلو."
   },
   {
    "tr": "Yarın gideceğimiz şehir çok uzak.",
    "en": "The city we are going to tomorrow is very far.",
    "ru": "Город, в который мы поедем завтра, очень далеко.",
    "de": "Die Stadt, in die wir morgen fahren, ist sehr weit weg.",
    "ar_sy": "المدينة اللي رح نروح عليها بكرا كتير بعيدة."
   },
   {
    "tr": "Türkçe bilen biri var mı?",
    "en": "Is there someone who knows Turkish?",
    "ru": "Есть кто-нибудь, кто знает турецкий?",
    "de": "Gibt es jemanden, der Türkisch kann?",
    "ar_sy": "في حدا بيعرف تركي؟"
   },
   {
    "tr": "Senin yaptığın yemek çok lezzetli.",
    "en": "The food you made is very delicious.",
    "ru": "Еда, которую ты приготовил, очень вкусная.",
    "de": "Das Essen, das du gemacht hast, ist sehr lecker.",
    "ar_sy": "الأكل اللي عملتو كتير طيّب."
   }
  ],
  "hints": {
   "en": "English keeps the noun and adds a relative pronoun (the man WHO reads); Turkish drops the pronoun entirely and puts the participle before the noun. The key choice is subject vs object: -en/-an for the doer, -dik/-ecek with a possessive suffix ('who did it' shows up as -um/-un/-u, not as a separate word) for the thing acted upon.",
   "ru": "Не ищите слово для «который» — его в турецком нет, и порядок обратный русскому: определение стоит ПЕРЕД существительным. Выбор делайте по роли существительного: деятель (подлежащее) → -en/-an (okuyan adam), объект действия → -dik/-ecek. При -dik/-ecek лицо «кто сделал» сидит в притяжательном окончании (-um/-un/-u...), а сам деятель — в родительном падеже (benim yaptığım — «то, что сделал я»), поэтому «который» тут вообще не превращается в отдельное слово. Частая ошибка русскоязычных: ставить -en/-an там, где существительное на самом деле дополнение — gören adam значит «человек, который видит», а «человек, которого я вижу» будет gördüğüm adam.",
   "de": "Deutsch benutzt Relativpronomen (der/die/das) und stellt den Relativsatz NACH das Nomen; Türkisch hat kein solches Wort und stellt das Partizip DAVOR. Achte auf die Rolle: -en/-an fürs Subjekt, -dik/-ecek mit Possessivsuffix fürs Objekt — die Person steckt im Suffix (-um/-un/-u), nicht in einem eigenen Wort.",
   "ar_sy": "بالعربي منستعمل 'اللي' لكل الحالات ومنحطّها بعد الاسم؛ بالتركي ما في كلمة متل 'اللي' والصفة بتيجي قبل الاسم. الفرق المهم: -en/-an للفاعل، و -dik/-ecek مع لاحقة ملكية للمفعول، والشخص (مين عمل) بيبيّن باللاحقة (-um/-un/-u) مو بكلمة لحالها."
  }
 },
 {
  "id": "voices",
  "icon": "🔃",
  "level": "B1",
  "title": {
   "tr": "Çatı ekleri (Fiil çatıları)",
   "en": "Verb voices",
   "ru": "Залоги глагола",
   "de": "Verbgenera (Diathesen)",
   "ar_sy": "أصوات الفعل (صيغ الفعل)"
  },
  "intro": {
   "tr": "Türkçede fiil kök veya gövdesine eklenen çatı ekleri, eylemin kim tarafından ve nasıl yapıldığını değiştirir: ettirgen (yaptırmak), edilgen (yapılmak), dönüşlü (yıkanmak) ve işteş (görüşmek). Bir fiile birden fazla çatı eki arka arkaya gelebilir.",
   "en": "In Turkish, voice suffixes attach to the verb stem and change who does the action and how: causative (make someone do), passive (be done), reflexive (do to oneself) and reciprocal/cooperative (do together / to each other). Several voice suffixes can stack on one verb.",
   "ru": "В турецком залог выражается не отдельными словами, а суффиксом на самом глаголе — в этом главное отличие от русского. Четыре залога: понудительный/каузатив (\"заставить/дать сделать\", yaptırmak), страдательный (yapılmak), возвратный (yıkanmak — мыться) и взаимно-совместный (görüşmek — видеться). Русское \"заставил его прочитать\" в турецком часто сжимается до одного глагола (okuttu), а частица -ся распадается на два разных суффикса — возвратный и страдательный.",
   "de": "Im Türkischen wird das Genus Verbi nicht durch eigene Wörter, sondern durch Suffixe am Verbstamm ausgedrückt: Kausativ (yaptırmak), Passiv (yapılmak), Reflexiv (yıkanmak) und Reziprok/Kooperativ (görüşmek). Mehrere solcher Suffixe können hintereinander stehen.",
   "ar_sy": "بالتركي صوت الفعل ما بينعمل بكلمات زيادة، بينعمل بلاحقة بتنضاف عأصل الفعل: السببي (yaptırmak خلّى حدا يعمل)، والمبني للمجهول (yapılmak)، والانعكاسي (yıkanmak يعني الواحد يغسل حالو)، والتشاركي (görüşmek يعني يشوفوا بعض). وفيه أكتر من لاحقة تجي ورا بعض بنفس الفعل."
  },
  "tables": [
   {
    "caption": {
     "tr": "Dört çatı — genel bakış",
     "en": "The four voices — overview",
     "ru": "Четыре залога — обзор",
     "de": "Die vier Diathesen — Überblick",
     "ar_sy": "الأصوات الأربعة — لمحة"
    },
    "columns": [
     {
      "tr": "Çatı",
      "en": "Voice",
      "ru": "Залог",
      "de": "Diathese",
      "ar_sy": "الصوت"
     },
     {
      "tr": "Ek",
      "en": "Suffix",
      "ru": "Суффикс",
      "de": "Suffix",
      "ar_sy": "اللاحقة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     },
     {
      "tr": "Anlam",
      "en": "Meaning",
      "ru": "Значение",
      "de": "Bedeutung",
      "ar_sy": "المعنى"
     }
    ],
    "rows": [
     {
      "cells": [
       "yapmak → yaptırmak",
       "-DIR / -t / -Ir",
       "ettirgen",
       "заставить/дать сделать · make someone do · lassen · خلّى حدا يعمل"
      ]
     },
     {
      "cells": [
       "yapmak → yapılmak",
       "-Il / -In",
       "edilgen",
       "быть сделанным · be done · Passiv · انعمل"
      ]
     },
     {
      "cells": [
       "yıkamak → yıkanmak",
       "-In / -Il",
       "dönüşlü",
       "мыться (себя) · wash oneself · sich waschen · يغسل حالو"
      ]
     },
     {
      "cells": [
       "görmek → görüşmek",
       "-Iş",
       "işteş",
       "видеться/делать вместе · meet / do together · sich treffen · يشوفوا بعض"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Edilgen çatının kuruluşu",
     "en": "How the passive is formed",
     "ru": "Как образуется страдательный залог",
     "de": "Bildung des Passivs",
     "ar_sy": "كيف بينعمل المبني للمجهول"
    },
    "columns": [
     {
      "tr": "Kök sonu",
      "en": "Stem ends in",
      "ru": "Основа оканчивается на",
      "de": "Stamm endet auf",
      "ar_sy": "آخر الجذر"
     },
     {
      "tr": "Ek",
      "en": "Suffix",
      "ru": "Суффикс",
      "de": "Suffix",
      "ar_sy": "اللاحقة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "cells": [
       "ünsüz (l hariç)",
       "-Il",
       "yapmak → yapılmak, açmak → açılmak"
      ]
     },
     {
      "cells": [
       "ünlü",
       "-n",
       "okumak → okunmak, beklemek → beklenmek"
      ]
     },
     {
      "cells": [
       "l ünsüzü",
       "-In",
       "bulmak → bulunmak, almak → alınmak"
      ]
     }
    ]
   },
   {
    "caption": {
     "tr": "Ettirgen çatının başlıca ekleri",
     "en": "Main causative suffixes",
     "ru": "Основные суффиксы каузатива",
     "de": "Wichtigste Kausativsuffixe",
     "ar_sy": "لواحق السببي الأساسية"
    },
    "columns": [
     {
      "tr": "Ek",
      "en": "Suffix",
      "ru": "Суффикс",
      "de": "Suffix",
      "ar_sy": "اللاحقة"
     },
     {
      "tr": "Örnek",
      "en": "Example",
      "ru": "Пример",
      "de": "Beispiel",
      "ar_sy": "مثال"
     }
    ],
    "rows": [
     {
      "cells": [
       "-DIR",
       "yapmak → yaptırmak, güldürmek, yedirmek"
      ]
     },
     {
      "cells": [
       "-t (ünlü/l/r ile biten çok heceli)",
       "okumak → okutmak, oturmak → oturtmak"
      ]
     },
     {
      "cells": [
       "-Ir / -It / düzensiz",
       "içmek → içirmek, düşmek → düşürmek, korkmak → korkutmak"
      ]
     }
    ]
   }
  ],
  "examples": [
   {
    "tr": "Öğretmen öğrencilere kitabı okuttu.",
    "en": "The teacher had the students read the book.",
    "ru": "Учитель заставил учеников прочитать книгу.",
    "de": "Der Lehrer ließ die Schüler das Buch lesen.",
    "ar_sy": "المعلّم خلّى الطلاب يقروا الكتاب."
   },
   {
    "tr": "Bu ev geçen yıl satıldı.",
    "en": "This house was sold last year.",
    "ru": "Этот дом продали в прошлом году.",
    "de": "Dieses Haus wurde letztes Jahr verkauft.",
    "ar_sy": "هالبيت انباع السنة الماضية."
   },
   {
    "tr": "Her sabah duşta yıkanırım.",
    "en": "Every morning I wash myself in the shower.",
    "ru": "Каждое утро я моюсь в душе.",
    "de": "Jeden Morgen wasche ich mich in der Dusche.",
    "ar_sy": "كل صبح بغسل حالي بالدوش."
   },
   {
    "tr": "Yarın eski arkadaşımla görüşeceğiz.",
    "en": "Tomorrow I'm meeting up with my old friend.",
    "ru": "Завтра мы встретимся с моим старым другом.",
    "de": "Morgen treffe ich mich mit meinem alten Freund.",
    "ar_sy": "بكرا رح نتلاقى أنا وصاحبي القديم."
   },
   {
    "tr": "Annem küçük kardeşime çorba içirdi.",
    "en": "My mother made my little sibling drink the soup.",
    "ru": "Мама напоила младшего братишку супом (дала выпить).",
    "de": "Meine Mutter gab meinem kleinen Geschwisterchen die Suppe zu trinken.",
    "ar_sy": "إمي شرّبت أخوي الصغير الشوربة."
   }
  ],
  "hints": {
   "en": "English needs helper words (make/have someone do, be done, oneself, each other); Turkish packs each of these into a single suffix on the verb, and the suffixes can even stack: yap-tır-ıl-mak 'to be made to be done'.",
   "ru": "Русское -ся в турецком раздваивается: возвратное \"мыться\" = yıkanmak, а страдательное \"это делается\" = yapılıyor — суффиксы похожи (-In / -Il), но различайте по смыслу. И помните: где в русском два слова (\"заставил прочитать\"), в турецком один глагол с каузативом (okuttu).",
   "de": "Wo das Deutsche lassen (Kausativ), werden + Partizip (Passiv) oder sich (Reflexiv) braucht, steht im Türkischen nur ein Suffix am Verb; Reflexiv (-In) und Passiv (-Il) sehen ähnlich aus, werden aber über die Bedeutung unterschieden.",
   "ar_sy": "بالعربي منقول \"خلّى حدا يعمل\" أو منستعمل \"انفعل / تفعّل\" للمجهول و\"حالو\" للانعكاسي؛ بالتركي كلو بيصير بلاحقة وحدة عالفعل، والانعكاسي (-In) والمجهول (-Il) بيشبهوا بعض بس بتفرقهن بالمعنى."
  }
 }
];

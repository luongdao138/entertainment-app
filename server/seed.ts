import prisma from "./config/prisma";

const mockLyricData = {
  sentences: [
    {
      words: [
        {
          startTime: 19070,
          endTime: 19330,
          data: "Yòu",
        },
        {
          startTime: 19330,
          endTime: 19830,
          data: "dàole",
        },
        {
          startTime: 19830,
          endTime: 20330,
          data: "lǐbài",
        },
        {
          startTime: 20330,
          endTime: 21070,
          data: "tiān",
        },
        {
          startTime: 21070,
          endTime: 21580,
          data: "wǒ",
        },
        {
          startTime: 21580,
          endTime: 21830,
          data: "hái",
        },
        {
          startTime: 21830,
          endTime: 22080,
          data: "zài",
        },
        {
          startTime: 22080,
          endTime: 23340,
          data: "jiālǐ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 23340,
          endTime: 23590,
          data: "Hǎo",
        },
        {
          startTime: 23590,
          endTime: 23840,
          data: "xiǎng",
        },
        {
          startTime: 23840,
          endTime: 24350,
          data: "yuē",
        },
        {
          startTime: 24350,
          endTime: 24350,
          data: "tā",
        },
        {
          startTime: 24350,
          endTime: 24870,
          data: "qù",
        },
        {
          startTime: 24870,
          endTime: 25120,
          data: "yóu",
        },
        {
          startTime: 25120,
          endTime: 25610,
          data: "leyùán",
        },
        {
          startTime: 25610,
          endTime: 27630,
          data: "ǒuỳu",
        },
      ],
    },
    {
      words: [
        {
          startTime: 27630,
          endTime: 27880,
          data: "Bù",
        },
        {
          startTime: 27880,
          endTime: 28380,
          data: "quèdìng",
        },
        {
          startTime: 28380,
          endTime: 28880,
          data: "tā",
        },
        {
          startTime: 28880,
          endTime: 29640,
          data: "shìfǒu",
        },
        {
          startTime: 29640,
          endTime: 30140,
          data: "qù",
        },
        {
          startTime: 30140,
          endTime: 30640,
          data: "zhǎole",
        },
        {
          startTime: 30640,
          endTime: 32140,
          data: "guīmì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 32140,
          endTime: 32390,
          data: "Zùi",
        },
        {
          startTime: 32390,
          endTime: 32650,
          data: "pà",
        },
        {
          startTime: 32650,
          endTime: 32890,
          data: "tā",
        },
        {
          startTime: 32890,
          endTime: 33170,
          data: "dùi",
        },
        {
          startTime: 33170,
          endTime: 33420,
          data: "wǒ",
        },
        {
          startTime: 33420,
          endTime: 33670,
          data: "ài",
        },
        {
          startTime: 33670,
          endTime: 33920,
          data: "dā",
        },
        {
          startTime: 33920,
          endTime: 34170,
          data: "bù",
        },
        {
          startTime: 34170,
          endTime: 36180,
          data: "lǐ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 36180,
          endTime: 36680,
          data: "Jīntiān",
        },
        {
          startTime: 36680,
          endTime: 36940,
          data: "de",
        },
        {
          startTime: 36940,
          endTime: 38190,
          data: "tiānqì",
        },
        {
          startTime: 38190,
          endTime: 38690,
          data: "qíngkōng",
        },
        {
          startTime: 38690,
          endTime: 39190,
          data: "wànlǐ",
        },
        {
          startTime: 39190,
          endTime: 39700,
          data: "wú",
        },
        {
          startTime: 39700,
          endTime: 40450,
          data: "ýun",
        },
      ],
    },
    {
      words: [
        {
          startTime: 40450,
          endTime: 40960,
          data: "Hǎo",
        },
        {
          startTime: 40960,
          endTime: 41460,
          data: "qídài",
        },
        {
          startTime: 41460,
          endTime: 41700,
          data: "tā",
        },
        {
          startTime: 41700,
          endTime: 41960,
          data: "yuē",
        },
        {
          startTime: 41960,
          endTime: 42460,
          data: "wǒ",
        },
        {
          startTime: 42460,
          endTime: 42710,
          data: "qù",
        },
        {
          startTime: 42710,
          endTime: 42960,
          data: "kàn",
        },
        {
          startTime: 42960,
          endTime: 44720,
          data: "dìanyǐng",
        },
      ],
    },
    {
      words: [
        {
          startTime: 44720,
          endTime: 44970,
          data: "Hùa",
        },
        {
          startTime: 44970,
          endTime: 45230,
          data: "hǎo",
        },
        {
          startTime: 45230,
          endTime: 45730,
          data: "zhuāng",
        },
        {
          startTime: 45730,
          endTime: 45970,
          data: "kàn",
        },
        {
          startTime: 45970,
          endTime: 46980,
          data: "shǒujī",
        },
      ],
    },
    {
      words: [
        {
          startTime: 46980,
          endTime: 47230,
          data: "Wǒ",
        },
        {
          startTime: 47230,
          endTime: 47480,
          data: "yǒu",
        },
        {
          startTime: 47480,
          endTime: 47980,
          data: "yīdiǎn",
        },
        {
          startTime: 47980,
          endTime: 48240,
          data: "diǎn",
        },
        {
          startTime: 48240,
          endTime: 49480,
          data: "zhāojí",
        },
      ],
    },
    {
      words: [
        {
          startTime: 49480,
          endTime: 49740,
          data: "Zhège",
        },
        {
          startTime: 49740,
          endTime: 50240,
          data: "bèndàn",
        },
        {
          startTime: 50240,
          endTime: 50740,
          data: "hái",
        },
        {
          startTime: 50740,
          endTime: 51000,
          data: "bù",
        },
        {
          startTime: 51000,
          endTime: 51240,
          data: "lái",
        },
        {
          startTime: 51240,
          endTime: 53510,
          data: "xiāoxī",
        },
      ],
    },
    {
      words: [
        {
          startTime: 53510,
          endTime: 54010,
          data: "Zìcóng",
        },
        {
          startTime: 54010,
          endTime: 54750,
          data: "ỳujìanle",
        },
        {
          startTime: 54750,
          endTime: 55510,
          data: "tā",
        },
      ],
    },
    {
      words: [
        {
          startTime: 55510,
          endTime: 55760,
          data: "Wǒ",
        },
        {
          startTime: 55760,
          endTime: 56260,
          data: "rǎn",
        },
        {
          startTime: 56260,
          endTime: 56520,
          data: "húi",
        },
        {
          startTime: 56520,
          endTime: 57020,
          data: "hēi",
        },
        {
          startTime: 57020,
          endTime: 58030,
          data: "fà",
        },
      ],
    },
    {
      words: [
        {
          startTime: 58030,
          endTime: 58280,
          data: "Zhǐ",
        },
        {
          startTime: 58280,
          endTime: 58530,
          data: "xiǎng",
        },
        {
          startTime: 58530,
          endTime: 58770,
          data: "gǎibìan",
        },
        {
          startTime: 58770,
          endTime: 59030,
          data: "tā",
        },
        {
          startTime: 59030,
          endTime: 59290,
          data: "dùi",
        },
        {
          startTime: 59290,
          endTime: 59780,
          data: "wǒ",
        },
        {
          startTime: 59780,
          endTime: 60030,
          data: "de",
        },
        {
          startTime: 60030,
          endTime: 61540,
          data: "kànfǎ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 61540,
          endTime: 62040,
          data: "Měi",
        },
        {
          startTime: 62040,
          endTime: 62550,
          data: "cì",
        },
        {
          startTime: 62550,
          endTime: 63310,
          data: "xiǎngqǐle",
        },
        {
          startTime: 63310,
          endTime: 64560,
          data: "tā",
        },
      ],
    },
    {
      words: [
        {
          startTime: 64560,
          endTime: 64820,
          data: "Xìao",
        },
        {
          startTime: 64820,
          endTime: 65060,
          data: "de",
        },
        {
          startTime: 65060,
          endTime: 65320,
          data: "xìang",
        },
        {
          startTime: 65320,
          endTime: 65560,
          data: "gè",
        },
        {
          startTime: 65560,
          endTime: 66820,
          data: "shǎguā",
        },
      ],
    },
    {
      words: [
        {
          startTime: 66820,
          endTime: 67080,
          data: "Lìan'ài",
        },
        {
          startTime: 67080,
          endTime: 67330,
          data: "ràng",
        },
        {
          startTime: 67330,
          endTime: 67570,
          data: "rén",
        },
        {
          startTime: 67570,
          endTime: 67830,
          data: "bìan",
        },
        {
          startTime: 67830,
          endTime: 68080,
          data: "dé",
        },
        {
          startTime: 68080,
          endTime: 68590,
          data: "xīnqíng",
        },
        {
          startTime: 68590,
          endTime: 70590,
          data: "fùzá",
        },
      ],
    },
    {
      words: [
        {
          startTime: 70590,
          endTime: 71100,
          data: "Nàgè",
        },
        {
          startTime: 71100,
          endTime: 71600,
          data: "tā",
        },
        {
          startTime: 71600,
          endTime: 72100,
          data: "jìushì",
        },
        {
          startTime: 72100,
          endTime: 72340,
          data: "nǐ",
        },
        {
          startTime: 72340,
          endTime: 72600,
          data: "qǐng",
        },
        {
          startTime: 72600,
          endTime: 72840,
          data: "nǐ",
        },
        {
          startTime: 72840,
          endTime: 73360,
          data: "buyàò",
        },
      ],
    },
    {
      words: [
        {
          startTime: 73360,
          endTime: 73600,
          data: "Zài",
        },
        {
          startTime: 73600,
          endTime: 73860,
          data: "dùi",
        },
        {
          startTime: 73860,
          endTime: 74360,
          data: "wǒ",
        },
        {
          startTime: 74360,
          endTime: 75050,
          data: "huaíyí",
        },
      ],
    },
    {
      words: [
        {
          startTime: 75050,
          endTime: 75300,
          data: "Wǒ",
        },
        {
          startTime: 75300,
          endTime: 75800,
          data: "zhǐshì",
        },
        {
          startTime: 75800,
          endTime: 76060,
          data: "guỳì",
        },
        {
          startTime: 76060,
          endTime: 76810,
          data: "jiǎzhuāng",
        },
        {
          startTime: 76810,
          endTime: 77310,
          data: "kàn",
        },
        {
          startTime: 77310,
          endTime: 77810,
          data: "qǐlái",
        },
      ],
    },
    {
      words: [
        {
          startTime: 77810,
          endTime: 78070,
          data: "Dùi",
        },
        {
          startTime: 78070,
          endTime: 78310,
          data: "nǐ",
        },
        {
          startTime: 78310,
          endTime: 78570,
          data: "bù",
        },
        {
          startTime: 78570,
          endTime: 79270,
          data: "zaìyì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 79270,
          endTime: 79510,
          data: "Shì",
        },
        {
          startTime: 79510,
          endTime: 80300,
          data: "bùshì",
        },
        {
          startTime: 80300,
          endTime: 80540,
          data: "wǒ",
        },
        {
          startTime: 80540,
          endTime: 80800,
          data: "tài",
        },
        {
          startTime: 80800,
          endTime: 81550,
          data: "bèn",
        },
      ],
    },
    {
      words: [
        {
          startTime: 81550,
          endTime: 81800,
          data: "Cái",
        },
        {
          startTime: 81800,
          endTime: 82050,
          data: "hùi",
        },
        {
          startTime: 82050,
          endTime: 82300,
          data: "ràng",
        },
        {
          startTime: 82300,
          endTime: 82550,
          data: "nǐ",
        },
        {
          startTime: 82550,
          endTime: 84070,
          data: "shēngqì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 84070,
          endTime: 84330,
          data: "Hāní",
        },
        {
          startTime: 84330,
          endTime: 84830,
          data: "buyò̀ng",
        },
        {
          startTime: 84830,
          endTime: 85070,
          data: "tài",
        },
        {
          startTime: 85070,
          endTime: 86260,
          data: "zhāojí",
        },
        {
          startTime: 86260,
          endTime: 86780,
          data: "zhèngmíng",
        },
        {
          startTime: 86780,
          endTime: 87280,
          data: "nǐ",
        },
        {
          startTime: 87280,
          endTime: 88020,
          data: "xīnỳi",
        },
      ],
    },
    {
      words: [
        {
          startTime: 88020,
          endTime: 88520,
          data: "Nàgè",
        },
        {
          startTime: 88520,
          endTime: 89020,
          data: "tā",
        },
        {
          startTime: 89020,
          endTime: 89280,
          data: "jìushì",
        },
        {
          startTime: 89280,
          endTime: 89780,
          data: "nǐ",
        },
        {
          startTime: 89780,
          endTime: 90020,
          data: "wǒ",
        },
        {
          startTime: 90020,
          endTime: 90280,
          data: "yùan",
        },
        {
          startTime: 90280,
          endTime: 90520,
          data: "wéi",
        },
        {
          startTime: 90520,
          endTime: 90780,
          data: "nǐ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 90780,
          endTime: 91020,
          data: "Zhēdǎng",
        },
        {
          startTime: 91020,
          endTime: 91540,
          data: "fēng",
        },
        {
          startTime: 91540,
          endTime: 91780,
          data: "hé",
        },
        {
          startTime: 91780,
          endTime: 92550,
          data: "yǔ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 92550,
          endTime: 92550,
          data: "Zhǐ",
        },
        {
          startTime: 92550,
          endTime: 93070,
          data: "xiǎng",
        },
        {
          startTime: 93070,
          endTime: 93320,
          data: "hǎohǎo",
        },
        {
          startTime: 93320,
          endTime: 93570,
          data: "gēn",
        },
        {
          startTime: 93570,
          endTime: 94070,
          data: "nǐ",
        },
        {
          startTime: 94070,
          endTime: 94570,
          data: "peiyá̌ng",
        },
        {
          startTime: 94570,
          endTime: 95070,
          data: "mòqì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 95070,
          endTime: 95330,
          data: "Zài",
        },
        {
          startTime: 95330,
          endTime: 95580,
          data: "lā",
        },
        {
          startTime: 95580,
          endTime: 95830,
          data: "jìn",
        },
        {
          startTime: 95830,
          endTime: 96580,
          data: "jùlí",
        },
      ],
    },
    {
      words: [
        {
          startTime: 96580,
          endTime: 97330,
          data: "Bùxiǎng",
        },
        {
          startTime: 97330,
          endTime: 97580,
          data: "nǐ",
        },
        {
          startTime: 97580,
          endTime: 97830,
          data: "gēn",
        },
        {
          startTime: 97830,
          endTime: 98330,
          data: "bíe",
        },
        {
          startTime: 98330,
          endTime: 98830,
          data: "de",
        },
      ],
    },
    {
      words: [
        {
          startTime: 98830,
          endTime: 99340,
          data: "Nánshēng",
        },
        {
          startTime: 99340,
          endTime: 101340,
          data: "méilaiyá̌nqù",
        },
      ],
    },
    {
      words: [
        {
          startTime: 101340,
          endTime: 101600,
          data: "Xiǎng",
        },
        {
          startTime: 101600,
          endTime: 102100,
          data: "jìnyībù",
        },
        {
          startTime: 102100,
          endTime: 102600,
          data: "liǎojiě",
        },
        {
          startTime: 102600,
          endTime: 103100,
          data: "nǐ",
        },
        {
          startTime: 103100,
          endTime: 104100,
          data: "kàojìn",
        },
        {
          startTime: 104100,
          endTime: 107100,
          data: "nǐ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 122930,
          endTime: 123180,
          data: "Yòu",
        },
        {
          startTime: 123180,
          endTime: 123690,
          data: "dàole",
        },
        {
          startTime: 123690,
          endTime: 124190,
          data: "lǐbài",
        },
        {
          startTime: 124190,
          endTime: 125190,
          data: "tiān",
        },
        {
          startTime: 125190,
          endTime: 125440,
          data: "wǒ",
        },
        {
          startTime: 125440,
          endTime: 125690,
          data: "hái",
        },
        {
          startTime: 125690,
          endTime: 125940,
          data: "zài",
        },
        {
          startTime: 125940,
          endTime: 127200,
          data: "jiālǐ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 127200,
          endTime: 127700,
          data: "Hǎo",
        },
        {
          startTime: 127700,
          endTime: 127950,
          data: "xiǎng",
        },
        {
          startTime: 127950,
          endTime: 128200,
          data: "yuē",
        },
        {
          startTime: 128200,
          endTime: 128460,
          data: "tā",
        },
        {
          startTime: 128460,
          endTime: 128700,
          data: "qù",
        },
        {
          startTime: 128700,
          endTime: 128960,
          data: "yóu",
        },
        {
          startTime: 128960,
          endTime: 129460,
          data: "leyùán",
        },
        {
          startTime: 129460,
          endTime: 131460,
          data: "ǒuỳu",
        },
      ],
    },
    {
      words: [
        {
          startTime: 131460,
          endTime: 131460,
          data: "Bù",
        },
        {
          startTime: 131460,
          endTime: 131980,
          data: "quèdìng",
        },
        {
          startTime: 131980,
          endTime: 132740,
          data: "tā",
        },
        {
          startTime: 132740,
          endTime: 133500,
          data: "shìfǒu",
        },
        {
          startTime: 133500,
          endTime: 134000,
          data: "qù",
        },
        {
          startTime: 134000,
          endTime: 134510,
          data: "zhǎole",
        },
        {
          startTime: 134510,
          endTime: 136010,
          data: "guīmì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 136010,
          endTime: 136010,
          data: "Zùi",
        },
        {
          startTime: 136010,
          endTime: 136510,
          data: "pà",
        },
        {
          startTime: 136510,
          endTime: 136750,
          data: "tā",
        },
        {
          startTime: 136750,
          endTime: 137010,
          data: "dùi",
        },
        {
          startTime: 137010,
          endTime: 137260,
          data: "wǒ",
        },
        {
          startTime: 137260,
          endTime: 137510,
          data: "ài",
        },
        {
          startTime: 137510,
          endTime: 137760,
          data: "dā",
        },
        {
          startTime: 137760,
          endTime: 138010,
          data: "bù",
        },
        {
          startTime: 138010,
          endTime: 140010,
          data: "lǐ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 140010,
          endTime: 140510,
          data: "Jīntiān",
        },
        {
          startTime: 140510,
          endTime: 140770,
          data: "de",
        },
        {
          startTime: 140770,
          endTime: 142030,
          data: "tiānqì",
        },
        {
          startTime: 142030,
          endTime: 142530,
          data: "qíngkōng",
        },
        {
          startTime: 142530,
          endTime: 143040,
          data: "wànlǐ",
        },
        {
          startTime: 143040,
          endTime: 143540,
          data: "wú",
        },
        {
          startTime: 143540,
          endTime: 144550,
          data: "ýun",
        },
      ],
    },
    {
      words: [
        {
          startTime: 144550,
          endTime: 144800,
          data: "Hǎo",
        },
        {
          startTime: 144800,
          endTime: 145300,
          data: "qídài",
        },
        {
          startTime: 145300,
          endTime: 145550,
          data: "tā",
        },
        {
          startTime: 145550,
          endTime: 145800,
          data: "yuē",
        },
        {
          startTime: 145800,
          endTime: 146310,
          data: "wǒ",
        },
        {
          startTime: 146310,
          endTime: 146560,
          data: "qù",
        },
        {
          startTime: 146560,
          endTime: 146810,
          data: "kàn",
        },
        {
          startTime: 146810,
          endTime: 148570,
          data: "dìanyǐng",
        },
      ],
    },
    {
      words: [
        {
          startTime: 148570,
          endTime: 148820,
          data: "Hùa",
        },
        {
          startTime: 148820,
          endTime: 149070,
          data: "hǎo",
        },
        {
          startTime: 149070,
          endTime: 149570,
          data: "zhuāng",
        },
        {
          startTime: 149570,
          endTime: 150070,
          data: "kàn",
        },
        {
          startTime: 150070,
          endTime: 150820,
          data: "shǒujī",
        },
      ],
    },
    {
      words: [
        {
          startTime: 150820,
          endTime: 151080,
          data: "Wǒ",
        },
        {
          startTime: 151080,
          endTime: 151320,
          data: "yǒu",
        },
        {
          startTime: 151320,
          endTime: 151820,
          data: "yīdiǎn",
        },
        {
          startTime: 151820,
          endTime: 152320,
          data: "diǎn",
        },
        {
          startTime: 152320,
          endTime: 153340,
          data: "zhāojí",
        },
      ],
    },
    {
      words: [
        {
          startTime: 153340,
          endTime: 153580,
          data: "Zhège",
        },
        {
          startTime: 153580,
          endTime: 154340,
          data: "bèndàn",
        },
        {
          startTime: 154340,
          endTime: 154590,
          data: "hái",
        },
        {
          startTime: 154590,
          endTime: 155090,
          data: "bù",
        },
        {
          startTime: 155090,
          endTime: 155350,
          data: "lái",
        },
        {
          startTime: 155350,
          endTime: 157350,
          data: "xiāoxī",
        },
      ],
    },
    {
      words: [
        {
          startTime: 157350,
          endTime: 157850,
          data: "Zìcóng",
        },
        {
          startTime: 157850,
          endTime: 158860,
          data: "ỳujìanle",
        },
        {
          startTime: 158860,
          endTime: 159570,
          data: "tā",
        },
        {
          startTime: 159570,
          endTime: 159820,
          data: "wǒ",
        },
        {
          startTime: 159820,
          endTime: 160070,
          data: "rǎn",
        },
        {
          startTime: 160070,
          endTime: 160320,
          data: "húi",
        },
        {
          startTime: 160320,
          endTime: 160820,
          data: "hēi",
        },
        {
          startTime: 160820,
          endTime: 161830,
          data: "fà",
        },
      ],
    },
    {
      words: [
        {
          startTime: 161830,
          endTime: 162080,
          data: "Zhǐ",
        },
        {
          startTime: 162080,
          endTime: 162330,
          data: "xiǎng",
        },
        {
          startTime: 162330,
          endTime: 162580,
          data: "gǎibìan",
        },
        {
          startTime: 162580,
          endTime: 163090,
          data: "tā",
        },
        {
          startTime: 163090,
          endTime: 163330,
          data: "dùi",
        },
        {
          startTime: 163330,
          endTime: 163580,
          data: "wǒ",
        },
        {
          startTime: 163580,
          endTime: 163840,
          data: "de",
        },
        {
          startTime: 163840,
          endTime: 165590,
          data: "kànfǎ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 165590,
          endTime: 165840,
          data: "Měi",
        },
        {
          startTime: 165840,
          endTime: 166340,
          data: "cì",
        },
        {
          startTime: 166340,
          endTime: 167350,
          data: "xiǎngqǐle",
        },
        {
          startTime: 167350,
          endTime: 168350,
          data: "tā",
        },
      ],
    },
    {
      words: [
        {
          startTime: 168350,
          endTime: 168610,
          data: "Xìao",
        },
        {
          startTime: 168610,
          endTime: 168860,
          data: "de",
        },
        {
          startTime: 168860,
          endTime: 169110,
          data: "xìang",
        },
        {
          startTime: 169110,
          endTime: 169360,
          data: "gè",
        },
        {
          startTime: 169360,
          endTime: 170610,
          data: "shǎguā",
        },
      ],
    },
    {
      words: [
        {
          startTime: 170610,
          endTime: 170870,
          data: "Lìan'ài",
        },
        {
          startTime: 170870,
          endTime: 171110,
          data: "ràng",
        },
        {
          startTime: 171110,
          endTime: 171370,
          data: "rén",
        },
        {
          startTime: 171370,
          endTime: 171610,
          data: "bìan",
        },
        {
          startTime: 171610,
          endTime: 171870,
          data: "dé",
        },
        {
          startTime: 171870,
          endTime: 172370,
          data: "xīnqíng",
        },
        {
          startTime: 172370,
          endTime: 174620,
          data: "fùzá",
        },
      ],
    },
    {
      words: [
        {
          startTime: 174620,
          endTime: 175120,
          data: "Nàgè",
        },
        {
          startTime: 175120,
          endTime: 175380,
          data: "tā",
        },
        {
          startTime: 175380,
          endTime: 175880,
          data: "jìushì",
        },
        {
          startTime: 175880,
          endTime: 176130,
          data: "nǐ",
        },
        {
          startTime: 176130,
          endTime: 176380,
          data: "qǐng",
        },
        {
          startTime: 176380,
          endTime: 176640,
          data: "nǐ",
        },
        {
          startTime: 176640,
          endTime: 177150,
          data: "buyàò",
        },
      ],
    },
    {
      words: [
        {
          startTime: 177150,
          endTime: 177390,
          data: "Zài",
        },
        {
          startTime: 177390,
          endTime: 177890,
          data: "dùi",
        },
        {
          startTime: 177890,
          endTime: 178150,
          data: "wǒ",
        },
        {
          startTime: 178150,
          endTime: 178900,
          data: "huaíyí",
        },
      ],
    },
    {
      words: [
        {
          startTime: 178900,
          endTime: 179160,
          data: "Wǒ",
        },
        {
          startTime: 179160,
          endTime: 179660,
          data: "zhǐshì",
        },
        {
          startTime: 179660,
          endTime: 180160,
          data: "guỳì",
        },
        {
          startTime: 180160,
          endTime: 180660,
          data: "jiǎzhuāng",
        },
        {
          startTime: 180660,
          endTime: 180910,
          data: "kàn",
        },
        {
          startTime: 180910,
          endTime: 181670,
          data: "qǐlái",
        },
      ],
    },
    {
      words: [
        {
          startTime: 181670,
          endTime: 181920,
          data: "Dùi",
        },
        {
          startTime: 181920,
          endTime: 182170,
          data: "nǐ",
        },
        {
          startTime: 182170,
          endTime: 182420,
          data: "bù",
        },
        {
          startTime: 182420,
          endTime: 183180,
          data: "zaìyì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 183180,
          endTime: 183420,
          data: "Shì",
        },
        {
          startTime: 183420,
          endTime: 183920,
          data: "bùshì",
        },
        {
          startTime: 183920,
          endTime: 184180,
          data: "wǒ",
        },
        {
          startTime: 184180,
          endTime: 184680,
          data: "tài",
        },
        {
          startTime: 184680,
          endTime: 185430,
          data: "bèn",
        },
      ],
    },
    {
      words: [
        {
          startTime: 185430,
          endTime: 185680,
          data: "Cái",
        },
        {
          startTime: 185680,
          endTime: 185940,
          data: "hùi",
        },
        {
          startTime: 185940,
          endTime: 186180,
          data: "ràng",
        },
        {
          startTime: 186180,
          endTime: 186440,
          data: "nǐ",
        },
        {
          startTime: 186440,
          endTime: 187940,
          data: "shēngqì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 187940,
          endTime: 188190,
          data: "Hāní",
        },
        {
          startTime: 188190,
          endTime: 188690,
          data: "buyò̀ng",
        },
        {
          startTime: 188690,
          endTime: 188940,
          data: "tài",
        },
        {
          startTime: 188940,
          endTime: 189950,
          data: "zhāojí",
        },
      ],
    },
    {
      words: [
        {
          startTime: 189950,
          endTime: 190700,
          data: "Zhèngmíng",
        },
        {
          startTime: 190700,
          endTime: 190950,
          data: "nǐ",
        },
        {
          startTime: 190950,
          endTime: 191950,
          data: "xīnỳi",
        },
      ],
    },
    {
      words: [
        {
          startTime: 191950,
          endTime: 192450,
          data: "Nàgè",
        },
        {
          startTime: 192450,
          endTime: 192710,
          data: "tā",
        },
        {
          startTime: 192710,
          endTime: 193210,
          data: "jìushì",
        },
        {
          startTime: 193210,
          endTime: 193450,
          data: "nǐ",
        },
        {
          startTime: 193450,
          endTime: 193710,
          data: "wǒ",
        },
        {
          startTime: 193710,
          endTime: 193950,
          data: "yùan",
        },
        {
          startTime: 193950,
          endTime: 194210,
          data: "wéi",
        },
        {
          startTime: 194210,
          endTime: 194710,
          data: "nǐ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 194710,
          endTime: 195210,
          data: "Zhēdǎng",
        },
        {
          startTime: 195210,
          endTime: 195470,
          data: "fēng",
        },
        {
          startTime: 195470,
          endTime: 195710,
          data: "hé",
        },
        {
          startTime: 195710,
          endTime: 196210,
          data: "yǔ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 196210,
          endTime: 196460,
          data: "Zhǐ",
        },
        {
          startTime: 196460,
          endTime: 196710,
          data: "xiǎng",
        },
        {
          startTime: 196710,
          endTime: 197220,
          data: "hǎohǎo",
        },
        {
          startTime: 197220,
          endTime: 197720,
          data: "gēn",
        },
        {
          startTime: 197720,
          endTime: 197970,
          data: "nǐ",
        },
        {
          startTime: 197970,
          endTime: 198470,
          data: "peiyá̌ng",
        },
        {
          startTime: 198470,
          endTime: 198970,
          data: "mòqì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 198970,
          endTime: 199220,
          data: "Zài",
        },
        {
          startTime: 199220,
          endTime: 199480,
          data: "lā",
        },
        {
          startTime: 199480,
          endTime: 199720,
          data: "jìn",
        },
        {
          startTime: 199720,
          endTime: 200480,
          data: "jùlí",
        },
      ],
    },
    {
      words: [
        {
          startTime: 200480,
          endTime: 200980,
          data: "Bùxiǎng",
        },
        {
          startTime: 200980,
          endTime: 201480,
          data: "nǐ",
        },
        {
          startTime: 201480,
          endTime: 201740,
          data: "gēn",
        },
        {
          startTime: 201740,
          endTime: 201980,
          data: "bíe",
        },
        {
          startTime: 201980,
          endTime: 202740,
          data: "de",
        },
      ],
    },
    {
      words: [
        {
          startTime: 202740,
          endTime: 203240,
          data: "Nánshēng",
        },
        {
          startTime: 203240,
          endTime: 204990,
          data: "méilaiyá̌nqù",
        },
      ],
    },
    {
      words: [
        {
          startTime: 204990,
          endTime: 205490,
          data: "Xiǎng",
        },
        {
          startTime: 205490,
          endTime: 205990,
          data: "jìnyībù",
        },
        {
          startTime: 205990,
          endTime: 206500,
          data: "liǎojiě",
        },
        {
          startTime: 206500,
          endTime: 207000,
          data: "nǐ",
        },
        {
          startTime: 207000,
          endTime: 207750,
          data: "kàojìn",
        },
        {
          startTime: 207750,
          endTime: 209270,
          data: "nǐ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 209270,
          endTime: 209770,
          data: "Nàgè",
        },
        {
          startTime: 209770,
          endTime: 210270,
          data: "tā",
        },
        {
          startTime: 210270,
          endTime: 210520,
          data: "jìushì",
        },
        {
          startTime: 210520,
          endTime: 210770,
          data: "nǐ",
        },
        {
          startTime: 210770,
          endTime: 211020,
          data: "qǐng",
        },
        {
          startTime: 211020,
          endTime: 211270,
          data: "nǐ",
        },
        {
          startTime: 211270,
          endTime: 211770,
          data: "buyàò",
        },
      ],
    },
    {
      words: [
        {
          startTime: 211770,
          endTime: 212030,
          data: "Zài",
        },
        {
          startTime: 212030,
          endTime: 212540,
          data: "dùi",
        },
        {
          startTime: 212540,
          endTime: 212790,
          data: "wǒ",
        },
        {
          startTime: 212790,
          endTime: 213540,
          data: "huaíyí",
        },
      ],
    },
    {
      words: [
        {
          startTime: 213540,
          endTime: 213790,
          data: "Wǒ",
        },
        {
          startTime: 213790,
          endTime: 214290,
          data: "zhǐshì",
        },
        {
          startTime: 214290,
          endTime: 214790,
          data: "guỳì",
        },
        {
          startTime: 214790,
          endTime: 215300,
          data: "jiǎzhuāng",
        },
        {
          startTime: 215300,
          endTime: 215800,
          data: "kàn",
        },
        {
          startTime: 215800,
          endTime: 216310,
          data: "qǐlái",
        },
      ],
    },
    {
      words: [
        {
          startTime: 216310,
          endTime: 216550,
          data: "Dùi",
        },
        {
          startTime: 216550,
          endTime: 216810,
          data: "nǐ",
        },
        {
          startTime: 216810,
          endTime: 217050,
          data: "bù",
        },
        {
          startTime: 217050,
          endTime: 217810,
          data: "zaìyì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 217810,
          endTime: 218050,
          data: "Shì",
        },
        {
          startTime: 218050,
          endTime: 218550,
          data: "bùshì",
        },
        {
          startTime: 218550,
          endTime: 219050,
          data: "wǒ",
        },
        {
          startTime: 219050,
          endTime: 219310,
          data: "tài",
        },
        {
          startTime: 219310,
          endTime: 220070,
          data: "bèn",
        },
      ],
    },
    {
      words: [
        {
          startTime: 220070,
          endTime: 220310,
          data: "Cái",
        },
        {
          startTime: 220310,
          endTime: 220570,
          data: "hùi",
        },
        {
          startTime: 220570,
          endTime: 220810,
          data: "ràng",
        },
        {
          startTime: 220810,
          endTime: 221060,
          data: "nǐ",
        },
        {
          startTime: 221060,
          endTime: 222570,
          data: "shēngqì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 222570,
          endTime: 222820,
          data: "Hāní",
        },
        {
          startTime: 222820,
          endTime: 223320,
          data: "buyò̀ng",
        },
        {
          startTime: 223320,
          endTime: 223580,
          data: "tài",
        },
        {
          startTime: 223580,
          endTime: 224580,
          data: "zhāojí",
        },
        {
          startTime: 224580,
          endTime: 225320,
          data: "zhèngmíng",
        },
        {
          startTime: 225320,
          endTime: 225580,
          data: "nǐ",
        },
        {
          startTime: 225580,
          endTime: 226580,
          data: "xīnỳi",
        },
      ],
    },
    {
      words: [
        {
          startTime: 226580,
          endTime: 227090,
          data: "Nàgè",
        },
        {
          startTime: 227090,
          endTime: 227340,
          data: "tā",
        },
        {
          startTime: 227340,
          endTime: 227840,
          data: "jìushì",
        },
        {
          startTime: 227840,
          endTime: 228090,
          data: "nǐ",
        },
        {
          startTime: 228090,
          endTime: 228340,
          data: "wǒ",
        },
        {
          startTime: 228340,
          endTime: 228850,
          data: "yùan",
        },
        {
          startTime: 228850,
          endTime: 228850,
          data: "wéi",
        },
        {
          startTime: 228850,
          endTime: 229360,
          data: "nǐ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 229360,
          endTime: 229860,
          data: "Zhēdǎng",
        },
        {
          startTime: 229860,
          endTime: 230110,
          data: "fēng",
        },
        {
          startTime: 230110,
          endTime: 230360,
          data: "hé",
        },
        {
          startTime: 230360,
          endTime: 230860,
          data: "yǔ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 230860,
          endTime: 231370,
          data: "Zhǐ",
        },
        {
          startTime: 231370,
          endTime: 231610,
          data: "xiǎng",
        },
        {
          startTime: 231610,
          endTime: 231870,
          data: "hǎohǎo",
        },
        {
          startTime: 231870,
          endTime: 232110,
          data: "gēn",
        },
        {
          startTime: 232110,
          endTime: 232380,
          data: "nǐ",
        },
        {
          startTime: 232380,
          endTime: 232880,
          data: "peiyá̌ng",
        },
        {
          startTime: 232880,
          endTime: 233650,
          data: "mòqì",
        },
      ],
    },
    {
      words: [
        {
          startTime: 233650,
          endTime: 233910,
          data: "Zài",
        },
        {
          startTime: 233910,
          endTime: 234150,
          data: "lā",
        },
        {
          startTime: 234150,
          endTime: 234410,
          data: "jìn",
        },
        {
          startTime: 234410,
          endTime: 235340,
          data: "jùlí",
        },
      ],
    },
    {
      words: [
        {
          startTime: 235340,
          endTime: 235840,
          data: "Bùxiǎng",
        },
        {
          startTime: 235840,
          endTime: 236100,
          data: "nǐ",
        },
        {
          startTime: 236100,
          endTime: 236350,
          data: "gēn",
        },
        {
          startTime: 236350,
          endTime: 236860,
          data: "bíe",
        },
        {
          startTime: 236860,
          endTime: 237360,
          data: "de",
        },
      ],
    },
    {
      words: [
        {
          startTime: 237360,
          endTime: 237860,
          data: "Nánshēng",
        },
        {
          startTime: 237860,
          endTime: 239610,
          data: "méilaiyá̌nqù",
        },
      ],
    },
    {
      words: [
        {
          startTime: 239610,
          endTime: 240110,
          data: "Xiǎng",
        },
        {
          startTime: 240110,
          endTime: 240610,
          data: "jìnyībù",
        },
        {
          startTime: 240610,
          endTime: 241120,
          data: "liǎojiě",
        },
        {
          startTime: 241120,
          endTime: 241620,
          data: "nǐ",
        },
        {
          startTime: 241620,
          endTime: 242370,
          data: "kàojìn",
        },
        {
          startTime: 242370,
          endTime: 244140,
          data: "nǐ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 244140,
          endTime: 244390,
          data: "Xiǎng",
        },
        {
          startTime: 244390,
          endTime: 244890,
          data: "jìnyībù",
        },
        {
          startTime: 244890,
          endTime: 245650,
          data: "liǎojiě",
        },
        {
          startTime: 245650,
          endTime: 246150,
          data: "nǐ",
        },
        {
          startTime: 246150,
          endTime: 249150,
          data: "kàojìn",
        },
        {
          startTime: 249150,
          endTime: 250150,
          data: "nǐ",
        },
      ],
    },
  ],
};

const main = async () => {
  // const data = await prisma.user.update({
  //     where: {
  //       id: 'fe4ab4a8-cf6e-4ca3-93a9-e73f24cd6322'
  //     },
  //     data: {
  //        is_premium: false,
  //        is_verified: true
  //     }
  // })

  // console.log({ data });
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       email: 'tu@gmail.com',
  //       full_name: 'Đào Cẩm Tú',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'quan@gmail.com',
  //       full_name: 'Đào Văn Quân',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'duong@gmail.com',
  //       full_name: 'Đào Văn Dương',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'phong@gmail.com',
  //       full_name: 'Nguyễn Trọng Phong',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'huong@gmail.com',
  //       full_name: 'Nguyễn Thị Hường',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'tronggmail.com',
  //       full_name: 'Dương Đức Trọng',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'phuc@gmail.com',
  //       full_name: 'Trần Văn Phúc',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //     {
  //       email: 'tiep@gmail.com',
  //       full_name: 'Trịnh Đức Tiệp',
  //       password:
  //         '$2a$10$KUjAIwUxm8gitCozDWdjP.JFmZPBck.efOtpLvpWcqPx6aMkfMEMK',
  //       is_verified: true,
  //     },
  //   ],
  // });

  // const lyric = await prisma.lyric.create({
  //   data: {
  //     song_id: "ae8c2132-cdd8-49fe-b370-d504475c0490",
  //     status: 1,
  //   },
  // });

  // for (const sentence of mockLyricData.sentences) {
  //   await prisma.sentence.create({
  //     data: {
  //       lyric_id: lyric.id,
  //       words: {
  //         createMany: {
  //           data: sentence.words.map((w) => ({
  //             data: w.data,
  //             end_time: w.endTime,
  //             start_time: w.endTime,
  //           })),
  //         },
  //       },
  //     },
  //   });
  // }

  console.log("success");
};

main();

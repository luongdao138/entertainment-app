import prisma from "./config/prisma";

const mockUsers = {};

const mockLyricData = {
  sentences: [
    {
      words: [
        {
          startTime: 21050,
          endTime: 22060,
          data: "Xa",
        },
        {
          startTime: 22060,
          endTime: 23120,
          data: "xa",
        },
        {
          startTime: 23120,
          endTime: 23650,
          data: "bóng",
        },
        {
          startTime: 23650,
          endTime: 23920,
          data: "người",
        },
        {
          startTime: 23920,
          endTime: 25510,
          data: "thương",
        },
      ],
    },
    {
      words: [
        {
          startTime: 25510,
          endTime: 25770,
          data: "Thấp",
        },
        {
          startTime: 25770,
          endTime: 26040,
          data: "thoáng",
        },
        {
          startTime: 26040,
          endTime: 26310,
          data: "trước",
        },
        {
          startTime: 26310,
          endTime: 26840,
          data: "thềm",
        },
        {
          startTime: 26840,
          endTime: 27370,
          data: "nhà",
        },
        {
          startTime: 27370,
          endTime: 27900,
          data: "đang",
        },
        {
          startTime: 27900,
          endTime: 28960,
          data: "đưa",
        },
        {
          startTime: 28960,
          endTime: 31620,
          data: "dâu",
        },
      ],
    },
    {
      words: [
        {
          startTime: 31620,
          endTime: 32680,
          data: "Nơi",
        },
        {
          startTime: 32680,
          endTime: 33210,
          data: "đây",
        },
        {
          startTime: 33210,
          endTime: 33480,
          data: "phấn",
        },
        {
          startTime: 33480,
          endTime: 34280,
          data: "son,",
        },
        {
          startTime: 34280,
          endTime: 35070,
          data: "áo",
        },
        {
          startTime: 35070,
          endTime: 35870,
          data: "màu",
        },
      ],
    },
    {
      words: [
        {
          startTime: 35870,
          endTime: 36130,
          data: "Em",
        },
        {
          startTime: 36130,
          endTime: 36400,
          data: "sắp",
        },
        {
          startTime: 36400,
          endTime: 36930,
          data: "theo",
        },
        {
          startTime: 36930,
          endTime: 37200,
          data: "chồng",
        },
      ],
    },
    {
      words: [
        {
          startTime: 37200,
          endTime: 37460,
          data: "Bỏ",
        },
        {
          startTime: 37460,
          endTime: 37730,
          data: "lại",
        },
        {
          startTime: 37730,
          endTime: 38260,
          data: "bến",
        },
        {
          startTime: 38260,
          endTime: 38520,
          data: "sông",
        },
        {
          startTime: 38520,
          endTime: 38790,
          data: "kia",
        },
        {
          startTime: 38790,
          endTime: 39320,
          data: "chờ",
        },
        {
          startTime: 39320,
          endTime: 40920,
          data: "mong",
        },
      ],
    },
    {
      words: [
        {
          startTime: 40920,
          endTime: 41450,
          data: "Khải",
        },
        {
          startTime: 41450,
          endTime: 41710,
          data: "lên",
        },
        {
          startTime: 41710,
          endTime: 41980,
          data: "khúc",
        },
        {
          startTime: 41980,
          endTime: 42510,
          data: "nhạc",
        },
        {
          startTime: 42510,
          endTime: 42770,
          data: "Hoàng",
        },
        {
          startTime: 42770,
          endTime: 43040,
          data: "Cầm",
        },
      ],
    },
    {
      words: [
        {
          startTime: 43040,
          endTime: 43310,
          data: "Buồn",
        },
        {
          startTime: 43310,
          endTime: 43840,
          data: "ngày",
        },
        {
          startTime: 43840,
          endTime: 44100,
          data: "mình",
        },
        {
          startTime: 44100,
          endTime: 44370,
          data: "biệt",
        },
        {
          startTime: 44370,
          endTime: 46230,
          data: "ly",
        },
      ],
    },
    {
      words: [
        {
          startTime: 46230,
          endTime: 46760,
          data: "Cung",
        },
        {
          startTime: 46760,
          endTime: 47020,
          data: "oán,",
        },
        {
          startTime: 47020,
          endTime: 47290,
          data: "cung",
        },
        {
          startTime: 47290,
          endTime: 47560,
          data: "sầu",
        },
      ],
    },
    {
      words: [
        {
          startTime: 47560,
          endTime: 47820,
          data: "Nặng",
        },
        {
          startTime: 47820,
          endTime: 48350,
          data: "lòng",
        },
        {
          startTime: 48350,
          endTime: 48620,
          data: "tiễn",
        },
        {
          startTime: 48620,
          endTime: 48880,
          data: "chân",
        },
        {
          startTime: 48880,
          endTime: 49150,
          data: "người",
        },
        {
          startTime: 49150,
          endTime: 49700,
          data: "ra",
        },
        {
          startTime: 49700,
          endTime: 51560,
          data: "đi",
        },
      ],
    },
    {
      words: [
        {
          startTime: 51560,
          endTime: 51820,
          data: "Xác",
        },
        {
          startTime: 51820,
          endTime: 52090,
          data: "pháo",
        },
        {
          startTime: 52090,
          endTime: 52350,
          data: "vu",
        },
        {
          startTime: 52350,
          endTime: 52880,
          data: "quy",
        },
        {
          startTime: 52880,
          endTime: 53150,
          data: "bên",
        },
        {
          startTime: 53150,
          endTime: 54210,
          data: "thềm",
        },
      ],
    },
    {
      words: [
        {
          startTime: 54210,
          endTime: 54480,
          data: "Có",
        },
        {
          startTime: 54480,
          endTime: 54740,
          data: "chăng",
        },
        {
          startTime: 54740,
          endTime: 55010,
          data: "hạnh",
        },
        {
          startTime: 55010,
          endTime: 55540,
          data: "phúc",
        },
        {
          startTime: 55540,
          endTime: 55810,
          data: "êm",
        },
        {
          startTime: 55810,
          endTime: 56870,
          data: "đềm",
        },
      ],
    },
    {
      words: [
        {
          startTime: 56870,
          endTime: 57130,
          data: "Đời",
        },
        {
          startTime: 57130,
          endTime: 57400,
          data: "người",
        },
        {
          startTime: 57400,
          endTime: 57670,
          data: "con",
        },
        {
          startTime: 57670,
          endTime: 58200,
          data: "gái",
        },
        {
          startTime: 58200,
          endTime: 58460,
          data: "đục",
        },
        {
          startTime: 58460,
          endTime: 58730,
          data: "trong",
        },
      ],
    },
    {
      words: [
        {
          startTime: 58730,
          endTime: 58990,
          data: "Mười",
        },
        {
          startTime: 58990,
          endTime: 59260,
          data: "hai",
        },
        {
          startTime: 59260,
          endTime: 59790,
          data: "bến",
        },
        {
          startTime: 59790,
          endTime: 60320,
          data: "nước",
        },
        {
          startTime: 60320,
          endTime: 60850,
          data: "long",
        },
        {
          startTime: 60850,
          endTime: 61920,
          data: "đong",
        },
      ],
    },
    {
      words: [
        {
          startTime: 61920,
          endTime: 62180,
          data: "Dặm",
        },
        {
          startTime: 62180,
          endTime: 62710,
          data: "ngàn",
        },
        {
          startTime: 62710,
          endTime: 62980,
          data: "thiên",
        },
        {
          startTime: 62980,
          endTime: 63240,
          data: "lý",
        },
        {
          startTime: 63240,
          endTime: 63510,
          data: "tiễn",
        },
        {
          startTime: 63510,
          endTime: 63780,
          data: "người",
        },
        {
          startTime: 63780,
          endTime: 64570,
          data: "đi",
        },
      ],
    },
    {
      words: [
        {
          startTime: 64570,
          endTime: 64840,
          data: "Mây",
        },
        {
          startTime: 64840,
          endTime: 65100,
          data: "nước",
        },
        {
          startTime: 65100,
          endTime: 65370,
          data: "u",
        },
        {
          startTime: 65370,
          endTime: 65920,
          data: "buồn",
        },
        {
          startTime: 65920,
          endTime: 66180,
          data: "ngày",
        },
        {
          startTime: 66180,
          endTime: 66450,
          data: "biệt",
        },
        {
          startTime: 66450,
          endTime: 67240,
          data: "ly",
        },
      ],
    },
    {
      words: [
        {
          startTime: 67240,
          endTime: 67510,
          data: "Khóc",
        },
        {
          startTime: 67510,
          endTime: 67780,
          data: "cho",
        },
        {
          startTime: 67780,
          endTime: 68040,
          data: "duyên",
        },
        {
          startTime: 68040,
          endTime: 68310,
          data: "mình",
        },
      ],
    },
    {
      words: [
        {
          startTime: 68310,
          endTime: 68840,
          data: "Đoạn",
        },
        {
          startTime: 68840,
          endTime: 69100,
          data: "trường",
        },
        {
          startTime: 69100,
          endTime: 69370,
          data: "thương",
        },
        {
          startTime: 69370,
          endTime: 69630,
          data: "loan",
        },
        {
          startTime: 69630,
          endTime: 70170,
          data: "đò",
        },
        {
          startTime: 70170,
          endTime: 70700,
          data: "sang",
        },
        {
          startTime: 70700,
          endTime: 72290,
          data: "ngang",
        },
      ],
    },
    {
      words: [
        {
          startTime: 72290,
          endTime: 72560,
          data: "Áo",
        },
        {
          startTime: 72560,
          endTime: 73090,
          data: "mới",
        },
        {
          startTime: 73090,
          endTime: 73360,
          data: "em",
        },
        {
          startTime: 73360,
          endTime: 73620,
          data: "cài",
        },
        {
          startTime: 73620,
          endTime: 73880,
          data: "màu",
        },
        {
          startTime: 73880,
          endTime: 74410,
          data: "hoa",
        },
        {
          startTime: 74410,
          endTime: 74950,
          data: "cưới",
        },
      ],
    },
    {
      words: [
        {
          startTime: 74950,
          endTime: 75210,
          data: "Sánh",
        },
        {
          startTime: 75210,
          endTime: 75740,
          data: "bước",
        },
        {
          startTime: 75740,
          endTime: 76010,
          data: "bên",
        },
        {
          startTime: 76010,
          endTime: 76270,
          data: "người",
        },
        {
          startTime: 76270,
          endTime: 76540,
          data: "cùng",
        },
        {
          startTime: 76540,
          endTime: 76810,
          data: "duyên",
        },
        {
          startTime: 76810,
          endTime: 77600,
          data: "mới",
        },
      ],
    },
    {
      words: [
        {
          startTime: 77600,
          endTime: 77870,
          data: "Nâng",
        },
        {
          startTime: 77870,
          endTime: 78130,
          data: "chén",
        },
        {
          startTime: 78130,
          endTime: 78670,
          data: "tiêu",
        },
        {
          startTime: 78670,
          endTime: 78930,
          data: "sầu",
        },
      ],
    },
    {
      words: [
        {
          startTime: 78930,
          endTime: 79200,
          data: "Khải",
        },
        {
          startTime: 79200,
          endTime: 79460,
          data: "một",
        },
        {
          startTime: 79460,
          endTime: 79990,
          data: "cung",
        },
        {
          startTime: 79990,
          endTime: 80260,
          data: "đàn",
        },
        {
          startTime: 80260,
          endTime: 80520,
          data: "từ",
        },
        {
          startTime: 80520,
          endTime: 81060,
          data: "biệt",
        },
        {
          startTime: 81060,
          endTime: 84060,
          data: "nhau",
        },
      ],
    },
    {
      words: [
        {
          startTime: 88420,
          endTime: 88950,
          data: "Bướm",
        },
        {
          startTime: 88950,
          endTime: 90020,
          data: "lượn",
        },
        {
          startTime: 90020,
          endTime: 90280,
          data: "là",
        },
        {
          startTime: 90280,
          endTime: 90550,
          data: "bướm",
        },
        {
          startTime: 90550,
          endTime: 91080,
          data: "ối",
        },
        {
          startTime: 91080,
          endTime: 91350,
          data: "a",
        },
        {
          startTime: 91350,
          endTime: 91610,
          data: "nó",
        },
        {
          startTime: 91610,
          endTime: 94610,
          data: "bay",
        },
      ],
    },
    {
      words: [
        {
          startTime: 98800,
          endTime: 99330,
          data: "Cá",
        },
        {
          startTime: 99330,
          endTime: 100660,
          data: "lội",
        },
        {
          startTime: 100660,
          endTime: 100920,
          data: "là",
        },
        {
          startTime: 100920,
          endTime: 101190,
          data: "cá",
        },
        {
          startTime: 101190,
          endTime: 101460,
          data: "ối",
        },
        {
          startTime: 101460,
          endTime: 101720,
          data: "a",
        },
        {
          startTime: 101720,
          endTime: 102250,
          data: "nó",
        },
        {
          startTime: 102250,
          endTime: 104780,
          data: "bơi",
        },
      ],
    },
    {
      words: [
        {
          startTime: 104780,
          endTime: 105580,
          data: "Yêu",
        },
        {
          startTime: 105580,
          endTime: 106310,
          data: "nhau",
        },
        {
          startTime: 106310,
          endTime: 107380,
          data: "cởi",
        },
        {
          startTime: 107380,
          endTime: 107640,
          data: "áo",
        },
        {
          startTime: 107640,
          endTime: 108170,
          data: "cho",
        },
        {
          startTime: 108170,
          endTime: 108710,
          data: "nhau",
        },
      ],
    },
    {
      words: [
        {
          startTime: 108710,
          endTime: 109240,
          data: "Về",
        },
        {
          startTime: 109240,
          endTime: 109500,
          data: "nhà",
        },
        {
          startTime: 109500,
          endTime: 109770,
          data: "mẹ",
        },
        {
          startTime: 109770,
          endTime: 111040,
          data: "hỏi",
        },
        {
          startTime: 111040,
          endTime: 111570,
          data: "qua",
        },
        {
          startTime: 111570,
          endTime: 112100,
          data: "cầu",
        },
        {
          startTime: 112100,
          endTime: 112900,
          data: "gió",
        },
        {
          startTime: 112900,
          endTime: 114230,
          data: "bay",
        },
      ],
    },
    {
      words: [
        {
          startTime: 114230,
          endTime: 114500,
          data: "Từ",
        },
        {
          startTime: 114500,
          endTime: 114760,
          data: "nay",
        },
        {
          startTime: 114760,
          endTime: 115030,
          data: "hết",
        },
        {
          startTime: 115030,
          endTime: 115290,
          data: "duyên",
        },
        {
          startTime: 115290,
          endTime: 115820,
          data: "em",
        },
        {
          startTime: 115820,
          endTime: 116090,
          data: "trả",
        },
        {
          startTime: 116090,
          endTime: 116810,
          data: "áo",
        },
      ],
    },
    {
      words: [
        {
          startTime: 116810,
          endTime: 117080,
          data: "Xem",
        },
        {
          startTime: 117080,
          endTime: 117340,
          data: "như",
        },
        {
          startTime: 117340,
          endTime: 117610,
          data: "hết",
        },
        {
          startTime: 117610,
          endTime: 118140,
          data: "tình",
        },
        {
          startTime: 118140,
          endTime: 118400,
          data: "mình",
        },
        {
          startTime: 118400,
          endTime: 118670,
          data: "đã",
        },
        {
          startTime: 118670,
          endTime: 119420,
          data: "trao",
        },
      ],
    },
    {
      words: [
        {
          startTime: 119420,
          endTime: 119690,
          data: "Phận",
        },
        {
          startTime: 119690,
          endTime: 119950,
          data: "duyên",
        },
        {
          startTime: 119950,
          endTime: 120220,
          data: "ta",
        },
        {
          startTime: 120220,
          endTime: 120750,
          data: "lỡ",
        },
      ],
    },
    {
      words: [
        {
          startTime: 120750,
          endTime: 121010,
          data: "Cung",
        },
        {
          startTime: 121010,
          endTime: 121280,
          data: "thương",
        },
        {
          startTime: 121280,
          endTime: 121550,
          data: "đứt",
        },
        {
          startTime: 121550,
          endTime: 121810,
          data: "đoạn,",
        },
        {
          startTime: 121810,
          endTime: 122340,
          data: "sầu",
        },
        {
          startTime: 122340,
          endTime: 122870,
          data: "đối",
        },
        {
          startTime: 122870,
          endTime: 123400,
          data: "gương",
        },
        {
          startTime: 123400,
          endTime: 124470,
          data: "loan",
        },
      ],
    },
    {
      words: [
        {
          startTime: 124470,
          endTime: 124730,
          data: "Dặm",
        },
        {
          startTime: 124730,
          endTime: 125260,
          data: "ngàn",
        },
        {
          startTime: 125260,
          endTime: 125530,
          data: "thiên",
        },
        {
          startTime: 125530,
          endTime: 125790,
          data: "lý",
        },
        {
          startTime: 125790,
          endTime: 126060,
          data: "tiễn",
        },
        {
          startTime: 126060,
          endTime: 126590,
          data: "người",
        },
        {
          startTime: 126590,
          endTime: 127120,
          data: "đi",
        },
      ],
    },
    {
      words: [
        {
          startTime: 127120,
          endTime: 127390,
          data: "Mây",
        },
        {
          startTime: 127390,
          endTime: 127650,
          data: "nước",
        },
        {
          startTime: 127650,
          endTime: 128190,
          data: "u",
        },
        {
          startTime: 128190,
          endTime: 128450,
          data: "buồn",
        },
        {
          startTime: 128450,
          endTime: 128720,
          data: "ngày",
        },
        {
          startTime: 128720,
          endTime: 128980,
          data: "biệt",
        },
        {
          startTime: 128980,
          endTime: 129780,
          data: "ly",
        },
      ],
    },
    {
      words: [
        {
          startTime: 129780,
          endTime: 130040,
          data: "Khóc",
        },
        {
          startTime: 130040,
          endTime: 130310,
          data: "cho",
        },
        {
          startTime: 130310,
          endTime: 130590,
          data: "duyên",
        },
        {
          startTime: 130590,
          endTime: 131110,
          data: "mình",
        },
      ],
    },
    {
      words: [
        {
          startTime: 131110,
          endTime: 131370,
          data: "Đoạn",
        },
        {
          startTime: 131370,
          endTime: 131640,
          data: "trường",
        },
        {
          startTime: 131640,
          endTime: 131900,
          data: "thương",
        },
        {
          startTime: 131900,
          endTime: 132430,
          data: "loan",
        },
        {
          startTime: 132430,
          endTime: 132700,
          data: "đò",
        },
        {
          startTime: 132700,
          endTime: 133230,
          data: "sang",
        },
        {
          startTime: 133230,
          endTime: 135090,
          data: "ngang",
        },
      ],
    },
    {
      words: [
        {
          startTime: 135090,
          endTime: 135360,
          data: "Áo",
        },
        {
          startTime: 135360,
          endTime: 135620,
          data: "mới",
        },
        {
          startTime: 135620,
          endTime: 135890,
          data: "em",
        },
        {
          startTime: 135890,
          endTime: 136150,
          data: "cài",
        },
        {
          startTime: 136150,
          endTime: 136680,
          data: "màu",
        },
        {
          startTime: 136680,
          endTime: 136950,
          data: "hoa",
        },
        {
          startTime: 136950,
          endTime: 137480,
          data: "cưới",
        },
      ],
    },
    {
      words: [
        {
          startTime: 137480,
          endTime: 138010,
          data: "Sánh",
        },
        {
          startTime: 138010,
          endTime: 138280,
          data: "bước",
        },
        {
          startTime: 138280,
          endTime: 138540,
          data: "bên",
        },
        {
          startTime: 138540,
          endTime: 138810,
          data: "người",
        },
        {
          startTime: 138810,
          endTime: 139340,
          data: "cùng",
        },
        {
          startTime: 139340,
          endTime: 139610,
          data: "duyên",
        },
        {
          startTime: 139610,
          endTime: 140080,
          data: "mới",
        },
      ],
    },
    {
      words: [
        {
          startTime: 140080,
          endTime: 140620,
          data: "Nâng",
        },
        {
          startTime: 140620,
          endTime: 140890,
          data: "chén",
        },
        {
          startTime: 140890,
          endTime: 141160,
          data: "tiêu",
        },
        {
          startTime: 141160,
          endTime: 141420,
          data: "sầu",
        },
      ],
    },
    {
      words: [
        {
          startTime: 141420,
          endTime: 141690,
          data: "Khải",
        },
        {
          startTime: 141690,
          endTime: 142220,
          data: "một",
        },
        {
          startTime: 142220,
          endTime: 142480,
          data: "cung",
        },
        {
          startTime: 142480,
          endTime: 142750,
          data: "đàn",
        },
        {
          startTime: 142750,
          endTime: 143020,
          data: "từ",
        },
        {
          startTime: 143020,
          endTime: 143550,
          data: "biệt",
        },
        {
          startTime: 143550,
          endTime: 146550,
          data: "nhau",
        },
      ],
    },
    {
      words: [
        {
          startTime: 148060,
          endTime: 148330,
          data: "Dặm",
        },
        {
          startTime: 148330,
          endTime: 148590,
          data: "ngàn",
        },
        {
          startTime: 148590,
          endTime: 149120,
          data: "thiên",
        },
        {
          startTime: 149120,
          endTime: 149390,
          data: "lý",
        },
        {
          startTime: 149390,
          endTime: 149660,
          data: "tiễn",
        },
        {
          startTime: 149660,
          endTime: 149920,
          data: "người",
        },
        {
          startTime: 149920,
          endTime: 150660,
          data: "đi",
        },
      ],
    },
    {
      words: [
        {
          startTime: 150660,
          endTime: 150920,
          data: "Mây",
        },
        {
          startTime: 150920,
          endTime: 151190,
          data: "nước",
        },
        {
          startTime: 151190,
          endTime: 151720,
          data: "u",
        },
        {
          startTime: 151720,
          endTime: 151980,
          data: "buồn",
        },
        {
          startTime: 151980,
          endTime: 152250,
          data: "ngày",
        },
        {
          startTime: 152250,
          endTime: 152510,
          data: "biệt",
        },
        {
          startTime: 152510,
          endTime: 153050,
          data: "ly",
        },
      ],
    },
    {
      words: [
        {
          startTime: 153050,
          endTime: 153580,
          data: "Khóc",
        },
        {
          startTime: 153580,
          endTime: 153840,
          data: "cho",
        },
        {
          startTime: 153840,
          endTime: 154110,
          data: "duyên",
        },
        {
          startTime: 154110,
          endTime: 154370,
          data: "mình",
        },
      ],
    },
    {
      words: [
        {
          startTime: 154370,
          endTime: 154910,
          data: "Đoạn",
        },
        {
          startTime: 154910,
          endTime: 155170,
          data: "trường",
        },
        {
          startTime: 155170,
          endTime: 155440,
          data: "thương",
        },
        {
          startTime: 155440,
          endTime: 155700,
          data: "loan",
        },
        {
          startTime: 155700,
          endTime: 156230,
          data: "đò",
        },
        {
          startTime: 156230,
          endTime: 156500,
          data: "sang",
        },
        {
          startTime: 156500,
          endTime: 158360,
          data: "ngang",
        },
      ],
    },
    {
      words: [
        {
          startTime: 158360,
          endTime: 158630,
          data: "Áo",
        },
        {
          startTime: 158630,
          endTime: 159150,
          data: "mới",
        },
        {
          startTime: 159150,
          endTime: 159420,
          data: "em",
        },
        {
          startTime: 159420,
          endTime: 159690,
          data: "cài",
        },
        {
          startTime: 159690,
          endTime: 159950,
          data: "màu",
        },
        {
          startTime: 159950,
          endTime: 160480,
          data: "hoa",
        },
        {
          startTime: 160480,
          endTime: 161250,
          data: "cưới",
        },
      ],
    },
    {
      words: [
        {
          startTime: 161250,
          endTime: 161520,
          data: "Sánh",
        },
        {
          startTime: 161520,
          endTime: 161780,
          data: "bước",
        },
        {
          startTime: 161780,
          endTime: 162050,
          data: "bên",
        },
        {
          startTime: 162050,
          endTime: 162320,
          data: "người",
        },
        {
          startTime: 162320,
          endTime: 162580,
          data: "cùng",
        },
        {
          startTime: 162580,
          endTime: 163110,
          data: "duyên",
        },
        {
          startTime: 163110,
          endTime: 163640,
          data: "mới",
        },
      ],
    },
    {
      words: [
        {
          startTime: 163640,
          endTime: 163910,
          data: "Nâng",
        },
        {
          startTime: 163910,
          endTime: 164170,
          data: "chén",
        },
        {
          startTime: 164170,
          endTime: 164710,
          data: "tiêu",
        },
        {
          startTime: 164710,
          endTime: 164970,
          data: "sầu",
        },
      ],
    },
    {
      words: [
        {
          startTime: 164970,
          endTime: 165240,
          data: "Khải",
        },
        {
          startTime: 165240,
          endTime: 165500,
          data: "một",
        },
        {
          startTime: 165500,
          endTime: 166040,
          data: "cung",
        },
        {
          startTime: 166040,
          endTime: 166300,
          data: "đàn",
        },
        {
          startTime: 166300,
          endTime: 166570,
          data: "từ",
        },
        {
          startTime: 166570,
          endTime: 167100,
          data: "biệt",
        },
        {
          startTime: 167100,
          endTime: 169220,
          data: "nhau",
        },
      ],
    },
    {
      words: [
        {
          startTime: 169220,
          endTime: 169750,
          data: "Bướm",
        },
        {
          startTime: 169750,
          endTime: 170820,
          data: "lượn",
        },
        {
          startTime: 170820,
          endTime: 171080,
          data: "là",
        },
        {
          startTime: 171080,
          endTime: 171610,
          data: "bướm",
        },
        {
          startTime: 171610,
          endTime: 171880,
          data: "ối",
        },
        {
          startTime: 171880,
          endTime: 172140,
          data: "a",
        },
        {
          startTime: 172140,
          endTime: 172410,
          data: "nó",
        },
        {
          startTime: 172410,
          endTime: 174540,
          data: "bay",
        },
      ],
    },
    {
      words: [
        {
          startTime: 174540,
          endTime: 175070,
          data: "Bướm",
        },
        {
          startTime: 175070,
          endTime: 175860,
          data: "dạo",
        },
        {
          startTime: 175860,
          endTime: 176390,
          data: "là",
        },
        {
          startTime: 176390,
          endTime: 176660,
          data: "bướm",
        },
        {
          startTime: 176660,
          endTime: 176930,
          data: "ối",
        },
        {
          startTime: 176930,
          endTime: 177460,
          data: "a",
        },
        {
          startTime: 177460,
          endTime: 177720,
          data: "nó",
        },
        {
          startTime: 177720,
          endTime: 179580,
          data: "bay",
        },
      ],
    },
    {
      words: [
        {
          startTime: 179580,
          endTime: 180380,
          data: "Cá",
        },
        {
          startTime: 180380,
          endTime: 181180,
          data: "lặn",
        },
        {
          startTime: 181180,
          endTime: 181440,
          data: "là",
        },
        {
          startTime: 181440,
          endTime: 181970,
          data: "cá",
        },
        {
          startTime: 181970,
          endTime: 182240,
          data: "ối",
        },
        {
          startTime: 182240,
          endTime: 182500,
          data: "a",
        },
        {
          startTime: 182500,
          endTime: 183030,
          data: "nó",
        },
        {
          startTime: 183030,
          endTime: 184920,
          data: "bơi",
        },
      ],
    },
    {
      words: [
        {
          startTime: 184920,
          endTime: 185440,
          data: "Cá",
        },
        {
          startTime: 185440,
          endTime: 186500,
          data: "lội",
        },
        {
          startTime: 186500,
          endTime: 186770,
          data: "là",
        },
        {
          startTime: 186770,
          endTime: 187030,
          data: "cá",
        },
        {
          startTime: 187030,
          endTime: 187570,
          data: "ối",
        },
        {
          startTime: 187570,
          endTime: 187830,
          data: "a",
        },
        {
          startTime: 187830,
          endTime: 188100,
          data: "nó",
        },
        {
          startTime: 188100,
          endTime: 189100,
          data: "bơi",
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

  const sentences_count = mockLyricData.sentences.length;
  const words_count = mockLyricData.sentences.reduce((acc, current) => {
    return acc + current.words.length;
  }, 0);

  console.log({ sentences_count, words_count });

  // for (const sentence of mockLyricData.sentences) {
  //   await prisma.sentence.create({
  //     data: {
  //       lyric_id: "2e8330d5-64d0-42aa-a7b6-eb69fde7c44c",
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
  // await prisma.lyric.create({
  //   data: {
  //     song_id: "0d896777-a38a-4c18-8091-734bcc7698ca",
  //     status: 1,
  //   },
  // });

  console.log("success");
};

main();

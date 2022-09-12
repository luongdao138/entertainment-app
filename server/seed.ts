import prisma from './config/prisma';

const mockUsers = {};

const mockLyricData = {
  sentences: [
    {
      words: [{ startTime: 500, endTime: 2000, data: 'Anh Khác Trước Rồi' }],
    },
    { words: [{ startTime: 2000, endTime: 4000, data: 'Ngọc Thúy' }] },
    {
      words: [
        { startTime: 44869, endTime: 45289, data: 'Xin' },
        { startTime: 45299, endTime: 45649, data: 'anh' },
        { startTime: 45649, endTime: 45879, data: 'đừng' },
        { startTime: 46499, endTime: 46769, data: 'nói' },
        { startTime: 46769, endTime: 47099, data: 'dối' },
        { startTime: 47099, endTime: 47379, data: 'em' },
        { startTime: 47429, endTime: 47709, data: 'nữa' },
        { startTime: 47709, endTime: 48289, data: 'được' },
        { startTime: 48289, endTime: 48889, data: 'không' },
      ],
    },
    {
      words: [
        { startTime: 49699, endTime: 50079, data: 'Vì' },
        { startTime: 50079, endTime: 50389, data: 'điều' },
        { startTime: 50389, endTime: 50929, data: 'đó' },
        { startTime: 50929, endTime: 51359, data: 'chỉ' },
        { startTime: 51359, endTime: 51879, data: 'làm' },
        { startTime: 51889, endTime: 52199, data: 'em' },
        { startTime: 52279, endTime: 52809, data: 'đau' },
        { startTime: 52809, endTime: 53199, data: 'lòng' },
      ],
    },
    {
      words: [
        { startTime: 54209, endTime: 54589, data: 'Xin' },
        { startTime: 54599, endTime: 54889, data: 'anh' },
        { startTime: 54889, endTime: 55219, data: 'đừng' },
        { startTime: 55219, endTime: 55780, data: 'làm' },
      ],
    },
    {
      words: [
        { startTime: 56069, endTime: 56409, data: 'Tổn' },
        { startTime: 56409, endTime: 56709, data: 'thương' },
        { startTime: 56709, endTime: 56979, data: 'em' },
        { startTime: 56979, endTime: 57329, data: 'được' },
        { startTime: 57339, endTime: 57500, data: 'không' },
      ],
    },
    {
      words: [
        { startTime: 59039, endTime: 59350, data: 'Đừng' },
        { startTime: 59350, endTime: 59609, data: 'làm' },
        { startTime: 59619, endTime: 59969, data: 'cho' },
        { startTime: 59969, endTime: 60529, data: 'em' },
        { startTime: 60529, endTime: 60880, data: 'níu' },
        { startTime: 60880, endTime: 61460, data: 'giữ' },
        { startTime: 61460, endTime: 61770, data: 'những' },
        { startTime: 61780, endTime: 62419, data: 'hy' },
        { startTime: 62429, endTime: 63029, data: 'vọng' },
      ],
    },
    {
      words: [
        { startTime: 63879, endTime: 64199, data: 'Nếu' },
        { startTime: 64199, endTime: 64479, data: 'có' },
        { startTime: 64479, endTime: 64810, data: 'một' },
        { startTime: 64810, endTime: 64940, data: 'lần' },
        { startTime: 65630, endTime: 65979, data: 'hai' },
        { startTime: 65979, endTime: 66259, data: 'ta' },
        { startTime: 66259, endTime: 66599, data: 'hoán' },
        { startTime: 66609, endTime: 66919, data: 'đổi' },
        { startTime: 66929, endTime: 67379, data: 'cho' },
        { startTime: 67549, endTime: 67939, data: 'nhau' },
      ],
    },
    {
      words: [
        { startTime: 68690, endTime: 68949, data: 'Anh' },
        { startTime: 68949, endTime: 69279, data: 'sẽ' },
        { startTime: 69299, endTime: 69489, data: 'biết' },
        { startTime: 69499, endTime: 70139, data: 'rằng' },
        { startTime: 70149, endTime: 70489, data: 'em' },
        { startTime: 70489, endTime: 70739, data: 'đã' },
        { startTime: 70739, endTime: 71269, data: 'đau' },
        { startTime: 71279, endTime: 71720, data: 'nhiều' },
        { startTime: 71720, endTime: 71790, data: 'lắm' },
      ],
    },
    {
      words: [
        { startTime: 73439, endTime: 73780, data: 'Nên' },
        { startTime: 73780, endTime: 74040, data: 'em' },
        { startTime: 74040, endTime: 74329, data: 'sẽ' },
        { startTime: 74339, endTime: 74939, data: 'chọn' },
        { startTime: 75269, endTime: 75419, data: 'là' },
        { startTime: 75569, endTime: 76109, data: 'người' },
        { startTime: 76109, endTime: 76509, data: 'ra' },
        { startTime: 76509, endTime: 77439, data: 'đi' },
      ],
    },
    {
      words: [
        { startTime: 78369, endTime: 78469, data: 'Vì' },
        { startTime: 78529, endTime: 78909, data: 'tình' },
        { startTime: 78919, endTime: 79269, data: 'yêu' },
        { startTime: 79269, endTime: 79669, data: 'anh' },
        { startTime: 79679, endTime: 79879, data: 'trao' },
        { startTime: 80149, endTime: 80419, data: 'em' },
        { startTime: 80529, endTime: 80929, data: 'khác' },
        { startTime: 80949, endTime: 81359, data: 'trước' },
        { startTime: 81369, endTime: 81849, data: 'rồi' },
      ],
    },
    {
      words: [
        { startTime: 85429, endTime: 85779, data: 'Nụ' },
        { startTime: 85779, endTime: 86089, data: 'cười' },
        { startTime: 86089, endTime: 86359, data: 'của' },
        { startTime: 86359, endTime: 86929, data: 'anh' },
        { startTime: 86929, endTime: 87289, data: 'nay' },
        { startTime: 87289, endTime: 87659, data: 'đã' },
      ],
    },
    {
      words: [
        { startTime: 87789, endTime: 88189, data: 'Không' },
        { startTime: 88189, endTime: 88289, data: 'còn' },
        { startTime: 88429, endTime: 88679, data: 'như' },
        { startTime: 88689, endTime: 89189, data: 'xưa' },
        { startTime: 89189, endTime: 89669, data: 'nữa' },
        { startTime: 89669, endTime: 90159, data: 'rồi' },
      ],
    },
    {
      words: [
        { startTime: 90339, endTime: 90509, data: 'Ở' },
        { startTime: 90519, endTime: 90839, data: 'trong' },
        { startTime: 90849, endTime: 91159, data: 'ánh' },
        { startTime: 91159, endTime: 91339, data: 'mắt' },
        { startTime: 91459, endTime: 91759, data: 'ấy' },
        { startTime: 91759, endTime: 92059, data: 'em' },
        { startTime: 92059, endTime: 92349, data: 'thấy' },
      ],
    },
    {
      words: [
        { startTime: 92709, endTime: 92999, data: 'Anh' },
        { startTime: 92999, endTime: 93199, data: 'đã' },
        { startTime: 93209, endTime: 93560, data: 'hết' },
        { startTime: 93570, endTime: 94080, data: 'yêu' },
        { startTime: 94080, endTime: 94570, data: 'em' },
        { startTime: 94570, endTime: 94760, data: 'rồi' },
      ],
    },
    {
      words: [
        { startTime: 95329, endTime: 95619, data: 'Em' },
        { startTime: 95619, endTime: 95929, data: 'không' },
        { startTime: 95929, endTime: 96259, data: 'cần' },
        { startTime: 96259, endTime: 96510, data: 'lời' },
        { startTime: 96510, endTime: 96830, data: 'xin' },
        { startTime: 96900, endTime: 97230, data: 'lỗi' },
      ],
    },
    {
      words: [
        { startTime: 97439, endTime: 97729, data: 'Em' },
        { startTime: 97729, endTime: 97940, data: 'cũng' },
        { startTime: 97979, endTime: 98320, data: 'chẳng' },
        { startTime: 98320, endTime: 98479, data: 'cần' },
        { startTime: 98629, endTime: 98899, data: 'lời' },
        { startTime: 98909, endTime: 99209, data: 'nói' },
        { startTime: 99209, endTime: 99919, data: 'dối' },
      ],
    },
    {
      words: [
        { startTime: 100109, endTime: 100399, data: 'Em' },
        { startTime: 100399, endTime: 100750, data: 'chỉ' },
        { startTime: 100750, endTime: 101110, data: 'cần' },
        { startTime: 101120, endTime: 101610, data: 'anh' },
        { startTime: 101620, endTime: 101939, data: 'người' },
        { startTime: 101939, endTime: 102130, data: 'của' },
        { startTime: 102310, endTime: 102620, data: 'quá' },
        { startTime: 102810, endTime: 103130, data: 'khứ' },
        { startTime: 103350, endTime: 104190, data: 'thôi' },
      ],
    },
    {
      words: [
        { startTime: 104619, endTime: 104970, data: 'Người' },
        { startTime: 104970, endTime: 105249, data: 'mà' },
        { startTime: 105279, endTime: 105559, data: 'em' },
        { startTime: 105569, endTime: 106040, data: 'yêu' },
        { startTime: 106040, endTime: 106319, data: 'ngày' },
        { startTime: 106339, endTime: 106819, data: 'xưa' },
      ],
    },
    {
      words: [
        { startTime: 107039, endTime: 107339, data: 'Chắc' },
        { startTime: 107339, endTime: 107669, data: 'nay' },
        { startTime: 107669, endTime: 107949, data: 'đã' },
        { startTime: 107949, endTime: 108239, data: 'ko' },
        { startTime: 108439, endTime: 108699, data: 'còn' },
        { startTime: 108879, endTime: 109049, data: 'nữa' },
      ],
    },
    {
      words: [
        { startTime: 109469, endTime: 109780, data: 'Người' },
        { startTime: 109780, endTime: 110109, data: 'từng' },
        { startTime: 110109, endTime: 110540, data: 'đã' },
        { startTime: 110540, endTime: 110569, data: 'hứa' },
        { startTime: 110629, endTime: 111039, data: 'sẽ' },
        { startTime: 111159, endTime: 111249, data: 'ở' },
        { startTime: 111249, endTime: 111549, data: 'bên' },
        { startTime: 111619, endTime: 111929, data: 'em' },
      ],
    },
    {
      words: [
        { startTime: 112139, endTime: 112439, data: 'Quan' },
        { startTime: 112439, endTime: 112649, data: 'tâm' },
        { startTime: 112729, endTime: 113069, data: 'em' },
        { startTime: 113069, endTime: 113630, data: 'mỗi' },
        { startTime: 113640, endTime: 114140, data: 'ngày' },
      ],
    },
    {
      words: [
        { startTime: 114469, endTime: 114830, data: 'Giờ' },
        { startTime: 114830, endTime: 115129, data: 'đây' },
        { startTime: 115139, endTime: 115629, data: 'trước' },
        { startTime: 115639, endTime: 116049, data: 'mặt' },
        { startTime: 116069, endTime: 116459, data: 'em' },
      ],
    },
    {
      words: [
        { startTime: 116659, endTime: 116920, data: 'Có' },
        { startTime: 116920, endTime: 117280, data: 'lẽ' },
        { startTime: 117280, endTime: 117550, data: 'là' },
        { startTime: 117550, endTime: 117989, data: 'một' },
        { startTime: 117989, endTime: 118469, data: 'người' },
        { startTime: 118479, endTime: 118669, data: 'khác' },
      ],
    },
    {
      words: [
        { startTime: 119339, endTime: 119659, data: 'Vẫn' },
        { startTime: 119659, endTime: 119969, data: 'nụ' },
        { startTime: 119969, endTime: 120349, data: 'cười' },
        { startTime: 120349, endTime: 120799, data: 'vẫn' },
        { startTime: 120809, endTime: 121199, data: 'ánh' },
        { startTime: 121199, endTime: 121399, data: 'mắt' },
        { startTime: 121469, endTime: 121889, data: 'ấy' },
        { startTime: 122019, endTime: 122279, data: 'mà' },
        { startTime: 122289, endTime: 122859, data: 'sao' },
      ],
    },
    {
      words: [
        { startTime: 123380, endTime: 123960, data: 'Không' },
        { startTime: 123960, endTime: 124540, data: 'phải' },
        { startTime: 124719, endTime: 125099, data: 'là' },
        { startTime: 125280, endTime: 126030, data: 'anh' },
      ],
    },
    {
      words: [
        { startTime: 150459, endTime: 150909, data: 'Xin' },
        { startTime: 150919, endTime: 151219, data: 'anh' },
        { startTime: 151219, endTime: 151750, data: 'đừng' },
        { startTime: 152060, endTime: 152370, data: 'nói' },
        { startTime: 152370, endTime: 152689, data: 'dối' },
        { startTime: 152689, endTime: 153019, data: 'em' },
        { startTime: 153019, endTime: 153279, data: 'nữa' },
        { startTime: 153279, endTime: 153629, data: 'được' },
        { startTime: 153929, endTime: 154129, data: 'không' },
      ],
    },
    {
      words: [
        { startTime: 155339, endTime: 155699, data: 'Vì' },
        { startTime: 155699, endTime: 155989, data: 'điều' },
        { startTime: 155989, endTime: 156509, data: 'đó' },
        { startTime: 156509, endTime: 156930, data: 'chỉ' },
        { startTime: 156930, endTime: 157430, data: 'làm' },
        { startTime: 157440, endTime: 157820, data: 'em' },
        { startTime: 157820, endTime: 158319, data: 'đau' },
        { startTime: 158339, endTime: 158940, data: 'lòng' },
      ],
    },
    {
      words: [
        { startTime: 159839, endTime: 160159, data: 'Xin' },
        { startTime: 160169, endTime: 160489, data: 'anh' },
        { startTime: 160489, endTime: 160679, data: 'đừng' },
        { startTime: 160769, endTime: 161349, data: 'làm' },
      ],
    },
    {
      words: [
        { startTime: 161699, endTime: 161979, data: 'Tổn' },
        { startTime: 161979, endTime: 162259, data: 'thương' },
        { startTime: 162259, endTime: 162569, data: 'em' },
        { startTime: 162569, endTime: 162850, data: 'được' },
        { startTime: 162860, endTime: 163389, data: 'không' },
      ],
    },
    {
      words: [
        { startTime: 164669, endTime: 164919, data: 'Đừng' },
        { startTime: 164929, endTime: 165229, data: 'làm' },
        { startTime: 165229, endTime: 165589, data: 'cho' },
        { startTime: 165599, endTime: 166149, data: 'em' },
        { startTime: 166149, endTime: 166439, data: 'níu' },
        { startTime: 166439, endTime: 166809, data: 'giữ' },
        { startTime: 166819, endTime: 167339, data: 'những' },
        { startTime: 167349, endTime: 167989, data: 'hy' },
        { startTime: 168019, endTime: 168479, data: 'vọng' },
      ],
    },
    {
      words: [
        { startTime: 169489, endTime: 169789, data: 'Nếu' },
        { startTime: 169789, endTime: 170089, data: 'có' },
        { startTime: 170089, endTime: 170429, data: 'một' },
        { startTime: 170429, endTime: 170689, data: 'lần' },
        { startTime: 171249, endTime: 171569, data: 'hai' },
        { startTime: 171569, endTime: 171809, data: 'ta' },
        { startTime: 171819, endTime: 172169, data: 'hoán' },
        { startTime: 172219, endTime: 172669, data: 'đổi' },
        { startTime: 172809, endTime: 173189, data: 'cho' },
        { startTime: 173329, endTime: 173769, data: 'nhau' },
      ],
    },
    {
      words: [
        { startTime: 174279, endTime: 174469, data: 'Anh' },
        { startTime: 174479, endTime: 174879, data: 'sẽ' },
        { startTime: 174879, endTime: 175079, data: 'biết' },
        { startTime: 175089, endTime: 175539, data: 'rằng' },
        { startTime: 175769, endTime: 176039, data: 'em' },
        { startTime: 176049, endTime: 176359, data: 'đã' },
        { startTime: 176359, endTime: 176989, data: 'đau' },
        { startTime: 177209, endTime: 177859, data: 'nhiều' },
        { startTime: 177859, endTime: 178049, data: 'lắm' },
      ],
    },
    {
      words: [
        { startTime: 178980, endTime: 179170, data: 'Nên' },
        { startTime: 179199, endTime: 179589, data: 'em' },
        { startTime: 179599, endTime: 179909, data: 'sẽ' },
        { startTime: 179909, endTime: 180169, data: 'chọn' },
        { startTime: 180589, endTime: 180849, data: 'là' },
        { startTime: 180849, endTime: 181169, data: 'người' },
        { startTime: 181609, endTime: 182079, data: 'ra' },
        { startTime: 182079, endTime: 183069, data: 'đi' },
      ],
    },
    {
      words: [
        { startTime: 183699, endTime: 183719, data: 'Vì' },
        { startTime: 184109, endTime: 184479, data: 'tình' },
        { startTime: 184489, endTime: 184879, data: 'yêu' },
        { startTime: 184889, endTime: 185109, data: 'anh' },
        { startTime: 185289, endTime: 185609, data: 'trao' },
        { startTime: 185739, endTime: 186249, data: 'em' },
        { startTime: 186259, endTime: 186539, data: 'khác' },
        { startTime: 186549, endTime: 187099, data: 'trước' },
        { startTime: 187109, endTime: 187609, data: 'rồi' },
      ],
    },
    {
      words: [
        { startTime: 191039, endTime: 191329, data: 'Nụ' },
        { startTime: 191329, endTime: 191699, data: 'cười' },
        { startTime: 191699, endTime: 191899, data: 'của' },
        { startTime: 191919, endTime: 192259, data: 'anh' },
        { startTime: 192479, endTime: 192869, data: 'nay' },
        { startTime: 192869, endTime: 193349, data: 'đã' },
      ],
    },
    {
      words: [
        { startTime: 193419, endTime: 193789, data: 'Không' },
        { startTime: 193789, endTime: 194019, data: 'còn' },
        { startTime: 194029, endTime: 194289, data: 'như' },
        { startTime: 194289, endTime: 194789, data: 'xưa' },
        { startTime: 194789, endTime: 195239, data: 'nữa' },
        { startTime: 195249, endTime: 195889, data: 'rồi' },
      ],
    },
    {
      words: [
        { startTime: 195979, endTime: 196139, data: 'Ở' },
        { startTime: 196149, endTime: 196479, data: 'trong' },
        { startTime: 196479, endTime: 196789, data: 'ánh' },
        { startTime: 196789, endTime: 197059, data: 'mắt' },
        { startTime: 197159, endTime: 197359, data: 'ấy' },
        { startTime: 197369, endTime: 197679, data: 'em' },
        { startTime: 197679, endTime: 198050, data: 'thấy' },
      ],
    },
    {
      words: [
        { startTime: 198270, endTime: 198599, data: 'Anh' },
        { startTime: 198599, endTime: 198809, data: 'đã' },
        { startTime: 198809, endTime: 199169, data: 'hết' },
        { startTime: 199179, endTime: 199439, data: 'yêu' },
        { startTime: 199449, endTime: 199999, data: 'em' },
        { startTime: 200009, endTime: 200449, data: 'rồi' },
      ],
    },
    {
      words: [
        { startTime: 200929, endTime: 201209, data: 'Em' },
        { startTime: 201219, endTime: 201529, data: 'không' },
        { startTime: 201529, endTime: 201839, data: 'cần' },
        { startTime: 201839, endTime: 202090, data: 'lời' },
        { startTime: 202090, endTime: 202500, data: 'xin' },
        { startTime: 202500, endTime: 202570, data: 'lỗi' },
      ],
    },
    {
      words: [
        { startTime: 203079, endTime: 203339, data: 'Em' },
        { startTime: 203339, endTime: 203599, data: 'cũng' },
        { startTime: 203609, endTime: 203940, data: 'chẳng' },
        { startTime: 203940, endTime: 204170, data: 'cần' },
        { startTime: 204180, endTime: 204509, data: 'lời' },
        { startTime: 204509, endTime: 204789, data: 'nói' },
        { startTime: 204789, endTime: 205739, data: 'dối' },
      ],
    },
    {
      words: [
        { startTime: 205799, endTime: 206019, data: 'Em' },
        { startTime: 206019, endTime: 206349, data: 'chỉ' },
        { startTime: 206359, endTime: 206699, data: 'cần' },
        { startTime: 206709, endTime: 207259, data: 'anh' },
        { startTime: 207259, endTime: 207549, data: 'người' },
        { startTime: 207549, endTime: 207870, data: 'của' },
        { startTime: 207979, endTime: 208409, data: 'quá' },
        { startTime: 208429, endTime: 208859, data: 'khứ' },
        { startTime: 209039, endTime: 210009, data: 'thôi' },
      ],
    },
    {
      words: [
        { startTime: 210259, endTime: 210559, data: 'Người' },
        { startTime: 210579, endTime: 210849, data: 'mà' },
        { startTime: 210859, endTime: 211139, data: 'em' },
        { startTime: 211149, endTime: 211569, data: 'yêu' },
        { startTime: 211619, endTime: 212009, data: 'ngày' },
        { startTime: 212019, endTime: 212539, data: 'xưa' },
      ],
    },
    {
      words: [
        { startTime: 212619, endTime: 212869, data: 'Chắc' },
        { startTime: 212959, endTime: 213269, data: 'nay' },
        { startTime: 213279, endTime: 213559, data: 'đã' },
        { startTime: 213559, endTime: 213809, data: 'ko' },
        { startTime: 214040, endTime: 214209, data: 'còn' },
        { startTime: 214480, endTime: 214790, data: 'nữa' },
      ],
    },
    {
      words: [
        { startTime: 215060, endTime: 215280, data: 'Người' },
        { startTime: 215359, endTime: 215689, data: 'từng' },
        { startTime: 215689, endTime: 215969, data: 'đã' },
        { startTime: 215969, endTime: 216169, data: 'hứa' },
        { startTime: 216329, endTime: 216599, data: 'sẽ' },
        { startTime: 216599, endTime: 216609, data: 'ở' },
        { startTime: 216859, endTime: 217159, data: 'bên' },
        { startTime: 217169, endTime: 217469, data: 'em' },
      ],
    },
    {
      words: [
        { startTime: 217730, endTime: 217919, data: 'Quan' },
        { startTime: 218019, endTime: 218329, data: 'tâm' },
        { startTime: 218339, endTime: 218750, data: 'em' },
        { startTime: 218750, endTime: 219249, data: 'mỗi' },
        { startTime: 219249, endTime: 219879, data: 'ngày' },
      ],
    },
    {
      words: [
        { startTime: 220099, endTime: 220439, data: 'Giờ' },
        { startTime: 220439, endTime: 220739, data: 'đây' },
        { startTime: 220739, endTime: 221229, data: 'trước' },
        { startTime: 221229, endTime: 221389, data: 'mặt' },
        { startTime: 221629, endTime: 222009, data: 'em' },
      ],
    },
    {
      words: [
        { startTime: 222260, endTime: 222420, data: 'Có' },
        { startTime: 222660, endTime: 222900, data: 'lẽ' },
        { startTime: 222910, endTime: 223170, data: 'là' },
        { startTime: 223170, endTime: 223599, data: 'một' },
        { startTime: 223599, endTime: 223949, data: 'người' },
        { startTime: 223979, endTime: 224420, data: 'khác' },
      ],
    },
    {
      words: [
        { startTime: 224910, endTime: 225330, data: 'Vẫn' },
        { startTime: 225330, endTime: 225549, data: 'nụ' },
        { startTime: 225559, endTime: 226009, data: 'cười' },
        { startTime: 226009, endTime: 226139, data: 'vẫn' },
        { startTime: 226369, endTime: 226810, data: 'ánh' },
        { startTime: 226810, endTime: 227090, data: 'mắt' },
        { startTime: 227449, endTime: 227619, data: 'ấy' },
        { startTime: 227699, endTime: 228079, data: 'mà' },
        { startTime: 228079, endTime: 228599, data: 'sao' },
      ],
    },
    {
      words: [
        { startTime: 229179, endTime: 229589, data: 'Không' },
        { startTime: 229589, endTime: 230279, data: 'phải' },
        { startTime: 230399, endTime: 231000, data: 'là' },
        { startTime: 231000, endTime: 231020, data: 'anh' },
      ],
    },
    {
      words: [
        { startTime: 234269, endTime: 234569, data: 'Nụ' },
        { startTime: 234569, endTime: 234869, data: 'cười' },
        { startTime: 234869, endTime: 235129, data: 'của' },
        { startTime: 235139, endTime: 235499, data: 'anh' },
        { startTime: 235659, endTime: 236079, data: 'nay' },
        { startTime: 236079, endTime: 236469, data: 'đã' },
      ],
    },
    {
      words: [
        { startTime: 236649, endTime: 236969, data: 'Không' },
        { startTime: 236969, endTime: 237259, data: 'còn' },
        { startTime: 237269, endTime: 237509, data: 'như' },
        { startTime: 237509, endTime: 237729, data: 'xưa' },
        { startTime: 237989, endTime: 238269, data: 'nữa' },
        { startTime: 238379, endTime: 238899, data: 'rồi' },
      ],
    },
    {
      words: [
        { startTime: 239110, endTime: 239300, data: 'Ở' },
        { startTime: 239309, endTime: 239669, data: 'trong' },
        { startTime: 239669, endTime: 239949, data: 'ánh' },
        { startTime: 239949, endTime: 240239, data: 'mắt' },
        { startTime: 240249, endTime: 240559, data: 'ấy' },
        { startTime: 240559, endTime: 240779, data: 'em' },
        { startTime: 240789, endTime: 241239, data: 'thấy' },
      ],
    },
    {
      words: [
        { startTime: 241410, endTime: 241789, data: 'Anh' },
        { startTime: 241789, endTime: 241989, data: 'đã' },
        { startTime: 241989, endTime: 242369, data: 'hết' },
        { startTime: 242379, endTime: 242879, data: 'yêu' },
        { startTime: 242889, endTime: 243229, data: 'em' },
        { startTime: 243239, endTime: 243650, data: 'rồi' },
      ],
    },
    {
      words: [
        { startTime: 244099, endTime: 244400, data: 'Em' },
        { startTime: 244400, endTime: 244720, data: 'không' },
        { startTime: 244720, endTime: 245040, data: 'cần' },
        { startTime: 245040, endTime: 245270, data: 'lời' },
        { startTime: 245270, endTime: 245680, data: 'xin' },
        { startTime: 245680, endTime: 245950, data: 'lỗi' },
      ],
    },
    {
      words: [
        { startTime: 246559, endTime: 246779, data: 'Em' },
        { startTime: 246779, endTime: 246809, data: 'cũng' },
        { startTime: 246819, endTime: 247120, data: 'chẳng' },
        { startTime: 247120, endTime: 247440, data: 'cần' },
        { startTime: 247450, endTime: 247710, data: 'lời' },
        { startTime: 247710, endTime: 248009, data: 'nói' },
        { startTime: 248009, endTime: 248380, data: 'dối' },
      ],
    },
    {
      words: [
        { startTime: 248940, endTime: 249199, data: 'Em' },
        { startTime: 249199, endTime: 249529, data: 'chỉ' },
        { startTime: 249549, endTime: 249899, data: 'cần' },
        { startTime: 249909, endTime: 250459, data: 'anh' },
        { startTime: 250459, endTime: 250759, data: 'người' },
        { startTime: 250759, endTime: 251059, data: 'của' },
        { startTime: 251149, endTime: 251569, data: 'quá' },
        { startTime: 251579, endTime: 252049, data: 'khứ' },
        { startTime: 252249, endTime: 252579, data: 'thôi' },
      ],
    },
    {
      words: [
        { startTime: 253599, endTime: 253739, data: 'Người' },
        { startTime: 253919, endTime: 254049, data: 'mà' },
        { startTime: 254059, endTime: 254359, data: 'em' },
        { startTime: 254369, endTime: 254739, data: 'yêu' },
        { startTime: 254849, endTime: 255139, data: 'ngày' },
        { startTime: 255159, endTime: 255379, data: 'xưa' },
      ],
    },
    {
      words: [
        { startTime: 255839, endTime: 256029, data: 'Chắc' },
        { startTime: 256159, endTime: 256439, data: 'nay' },
        { startTime: 256489, endTime: 256749, data: 'đã' },
        { startTime: 256749, endTime: 256980, data: 'ko' },
        { startTime: 257240, endTime: 257519, data: 'còn' },
        { startTime: 257680, endTime: 257990, data: 'nữa' },
      ],
    },
    {
      words: [
        { startTime: 258269, endTime: 258480, data: 'Người' },
        { startTime: 258559, endTime: 258899, data: 'từng' },
        { startTime: 258899, endTime: 259349, data: 'đã' },
        { startTime: 259349, endTime: 259369, data: 'hứa' },
        { startTime: 259379, endTime: 259969, data: 'sẽ' },
        { startTime: 259969, endTime: 259979, data: 'ở' },
        { startTime: 260059, endTime: 260369, data: 'bên' },
        { startTime: 260379, endTime: 260729, data: 'em' },
      ],
    },
    {
      words: [
        { startTime: 260949, endTime: 261159, data: 'Quan' },
        { startTime: 261239, endTime: 261539, data: 'tâm' },
        { startTime: 261569, endTime: 261939, data: 'em' },
        { startTime: 261939, endTime: 262430, data: 'mỗi' },
        { startTime: 262430, endTime: 263050, data: 'ngày' },
      ],
    },
    {
      words: [
        { startTime: 263289, endTime: 263640, data: 'Giờ' },
        { startTime: 263640, endTime: 263950, data: 'đây' },
        { startTime: 263950, endTime: 264429, data: 'trước' },
        { startTime: 264429, endTime: 264609, data: 'mặt' },
        { startTime: 264829, endTime: 265129, data: 'em' },
      ],
    },
    {
      words: [
        { startTime: 265439, endTime: 265699, data: 'Có' },
        { startTime: 265699, endTime: 266019, data: 'lẽ' },
        { startTime: 266039, endTime: 266339, data: 'là' },
        { startTime: 266339, endTime: 266749, data: 'một' },
        { startTime: 266749, endTime: 267309, data: 'người' },
        { startTime: 267309, endTime: 267419, data: 'khác' },
      ],
    },
    {
      words: [
        { startTime: 268119, endTime: 268299, data: 'Vẫn' },
        { startTime: 268479, endTime: 268769, data: 'nụ' },
        { startTime: 268779, endTime: 269179, data: 'cười' },
        { startTime: 269179, endTime: 269619, data: 'vẫn' },
        { startTime: 269629, endTime: 269999, data: 'ánh' },
        { startTime: 269999, endTime: 270289, data: 'mắt' },
        { startTime: 270359, endTime: 270789, data: 'ấy' },
        { startTime: 270849, endTime: 271099, data: 'mà' },
        { startTime: 271099, endTime: 271779, data: 'sao' },
      ],
    },
    {
      words: [
        { startTime: 272329, endTime: 272769, data: 'Không' },
        { startTime: 272769, endTime: 273449, data: 'phải' },
        { startTime: 273449, endTime: 273469, data: 'là' },
        { startTime: 274549, endTime: 274899, data: 'anh' },
      ],
    },
    {
      words: [
        { startTime: 277730, endTime: 277860, data: 'Vẫn' },
        { startTime: 278069, endTime: 278339, data: 'nụ' },
        { startTime: 278349, endTime: 278769, data: 'cười' },
        { startTime: 278769, endTime: 279249, data: 'vẫn' },
        { startTime: 279259, endTime: 279629, data: 'ánh' },
        { startTime: 279629, endTime: 279899, data: 'mắt' },
        { startTime: 279939, endTime: 280409, data: 'ấy' },
        { startTime: 280679, endTime: 280869, data: 'mà' },
        { startTime: 280969, endTime: 281279, data: 'sao' },
      ],
    },
    {
      words: [
        { startTime: 285909, endTime: 286329, data: 'Không' },
        { startTime: 286329, endTime: 287059, data: 'phải' },
        { startTime: 287639, endTime: 288029, data: 'là' },
        { startTime: 288029, endTime: 288049, data: 'anh' },
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
  //       lyric_id: '0eccdcb6-9d71-4cf2-91bf-e63f51a79e09',
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
  //     song_id: '7ec74c77-ead1-4dc1-ad5e-4318e388aa29',
  //     status: 1,
  //   },
  // });

  console.log('success');
};

main();

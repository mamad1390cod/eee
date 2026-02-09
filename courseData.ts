// Course Data - 5 Months of English Learning
// Each month has 25 learning days + 5 exam days

export interface Word {
  id: string;
  english: string;
  persian: string;
  pronunciation: string;
  example: string;
  examplePersian: string;
}

export interface Sentence {
  id: string;
  english: string;
  persian: string;
  words: string[];
}

export interface DayContent {
  day: number;
  words: Word[];
  sentences: Sentence[];
}

export interface MonthData {
  month: number;
  title: string;
  level: string;
  days: DayContent[];
  unlockCode: string;
}

// Month 1: Very Beginner - Basic Greetings and Introductions
const month1Days: DayContent[] = [
  {
    day: 1,
    words: [
      { id: 'm1d1w1', english: 'hello', persian: 'سلام', pronunciation: 'həˈloʊ', example: 'Hello, how are you?', examplePersian: 'سلام، حالت چطوره؟' },
      { id: 'm1d1w2', english: 'hi', persian: 'سلام (غیررسمی)', pronunciation: 'haɪ', example: 'Hi there!', examplePersian: 'سلام!' },
      { id: 'm1d1w3', english: 'good', persian: 'خوب', pronunciation: 'ɡʊd', example: 'Good morning!', examplePersian: 'صبح بخیر!' },
      { id: 'm1d1w4', english: 'morning', persian: 'صبح', pronunciation: 'ˈmɔːrnɪŋ', example: 'Good morning!', examplePersian: 'صبح بخیر!' },
      { id: 'm1d1w5', english: 'I', persian: 'من', pronunciation: 'aɪ', example: 'I am happy.', examplePersian: 'من خوشحالم.' },
    ],
    sentences: [
      { id: 'm1d1s1', english: 'Hello, good morning!', persian: 'سلام، صبح بخیر!', words: ['Hello', 'good', 'morning'] },
      { id: 'm1d1s2', english: 'Hi, I am good.', persian: 'سلام، من خوبم.', words: ['Hi', 'I', 'am', 'good'] },
    ]
  },
  {
    day: 2,
    words: [
      { id: 'm1d2w1', english: 'am', persian: 'هستم', pronunciation: 'æm', example: 'I am here.', examplePersian: 'من اینجا هستم.' },
      { id: 'm1d2w2', english: 'you', persian: 'تو/شما', pronunciation: 'juː', example: 'You are nice.', examplePersian: 'تو خوبی.' },
      { id: 'm1d2w3', english: 'are', persian: 'هستی/هستید', pronunciation: 'ɑːr', example: 'You are my friend.', examplePersian: 'تو دوست من هستی.' },
      { id: 'm1d2w4', english: 'name', persian: 'اسم', pronunciation: 'neɪm', example: 'My name is Ali.', examplePersian: 'اسم من علی است.' },
      { id: 'm1d2w5', english: 'my', persian: 'مال من', pronunciation: 'maɪ', example: 'My book is here.', examplePersian: 'کتاب من اینجاست.' },
    ],
    sentences: [
      { id: 'm1d2s1', english: 'I am good.', persian: 'من خوبم.', words: ['I', 'am', 'good'] },
      { id: 'm1d2s2', english: 'My name is Ali.', persian: 'اسم من علی است.', words: ['My', 'name', 'is', 'Ali'] },
      { id: 'm1d2s3', english: 'Hello, you are good.', persian: 'سلام، تو خوبی.', words: ['Hello', 'you', 'are', 'good'] },
    ]
  },
  {
    day: 3,
    words: [
      { id: 'm1d3w1', english: 'is', persian: 'است/هست', pronunciation: 'ɪz', example: 'He is happy.', examplePersian: 'او خوشحال است.' },
      { id: 'm1d3w2', english: 'what', persian: 'چه/چی', pronunciation: 'wɑːt', example: 'What is your name?', examplePersian: 'اسمت چیه؟' },
      { id: 'm1d3w3', english: 'your', persian: 'مال تو', pronunciation: 'jɔːr', example: 'Your book is nice.', examplePersian: 'کتاب تو خوبه.' },
      { id: 'm1d3w4', english: 'nice', persian: 'خوب/زیبا', pronunciation: 'naɪs', example: 'Nice to meet you.', examplePersian: 'از آشناییت خوشحالم.' },
      { id: 'm1d3w5', english: 'to', persian: 'به/برای', pronunciation: 'tuː', example: 'Nice to meet you.', examplePersian: 'از آشناییت خوشحالم.' },
    ],
    sentences: [
      { id: 'm1d3s1', english: 'What is your name?', persian: 'اسم تو چیه؟', words: ['What', 'is', 'your', 'name'] },
      { id: 'm1d3s2', english: 'Nice to meet you.', persian: 'از آشناییت خوشحالم.', words: ['Nice', 'to', 'meet', 'you'] },
    ]
  },
  {
    day: 4,
    words: [
      { id: 'm1d4w1', english: 'meet', persian: 'ملاقات کردن', pronunciation: 'miːt', example: 'I meet my friend.', examplePersian: 'من دوستم رو ملاقات می‌کنم.' },
      { id: 'm1d4w2', english: 'too', persian: 'هم/همچنین', pronunciation: 'tuː', example: 'Nice to meet you too.', examplePersian: 'منم از آشناییت خوشحالم.' },
      { id: 'm1d4w3', english: 'how', persian: 'چطور/چگونه', pronunciation: 'haʊ', example: 'How are you?', examplePersian: 'حالت چطوره؟' },
      { id: 'm1d4w4', english: 'fine', persian: 'خوب', pronunciation: 'faɪn', example: 'I am fine.', examplePersian: 'من خوبم.' },
      { id: 'm1d4w5', english: 'thank', persian: 'تشکر کردن', pronunciation: 'θæŋk', example: 'Thank you.', examplePersian: 'ممنون.' },
    ],
    sentences: [
      { id: 'm1d4s1', english: 'How are you?', persian: 'حالت چطوره؟', words: ['How', 'are', 'you'] },
      { id: 'm1d4s2', english: 'I am fine, thank you.', persian: 'من خوبم، ممنون.', words: ['I', 'am', 'fine', 'thank', 'you'] },
      { id: 'm1d4s3', english: 'Nice to meet you too.', persian: 'منم از آشناییت خوشحالم.', words: ['Nice', 'to', 'meet', 'you', 'too'] },
    ]
  },
  {
    day: 5,
    words: [
      { id: 'm1d5w1', english: 'yes', persian: 'بله', pronunciation: 'jes', example: 'Yes, I am.', examplePersian: 'بله، هستم.' },
      { id: 'm1d5w2', english: 'no', persian: 'نه', pronunciation: 'noʊ', example: 'No, thank you.', examplePersian: 'نه، ممنون.' },
      { id: 'm1d5w3', english: 'please', persian: 'لطفاً', pronunciation: 'pliːz', example: 'Yes, please.', examplePersian: 'بله، لطفاً.' },
      { id: 'm1d5w4', english: 'sorry', persian: 'متأسف', pronunciation: 'ˈsɑːri', example: 'I am sorry.', examplePersian: 'متأسفم.' },
      { id: 'm1d5w5', english: 'excuse', persian: 'ببخشید', pronunciation: 'ɪkˈskjuːz', example: 'Excuse me.', examplePersian: 'ببخشید.' },
    ],
    sentences: [
      { id: 'm1d5s1', english: 'Yes, please.', persian: 'بله، لطفاً.', words: ['Yes', 'please'] },
      { id: 'm1d5s2', english: 'No, thank you.', persian: 'نه، ممنون.', words: ['No', 'thank', 'you'] },
      { id: 'm1d5s3', english: 'I am sorry.', persian: 'متأسفم.', words: ['I', 'am', 'sorry'] },
      { id: 'm1d5s4', english: 'Excuse me, please.', persian: 'ببخشید، لطفاً.', words: ['Excuse', 'me', 'please'] },
    ]
  },
  {
    day: 6,
    words: [
      { id: 'm1d6w1', english: 'me', persian: 'من (مفعولی)', pronunciation: 'miː', example: 'Help me please.', examplePersian: 'لطفاً کمکم کن.' },
      { id: 'm1d6w2', english: 'he', persian: 'او (مرد)', pronunciation: 'hiː', example: 'He is my friend.', examplePersian: 'او دوست من است.' },
      { id: 'm1d6w3', english: 'she', persian: 'او (زن)', pronunciation: 'ʃiː', example: 'She is nice.', examplePersian: 'او خوبه.' },
      { id: 'm1d6w4', english: 'friend', persian: 'دوست', pronunciation: 'frend', example: 'You are my friend.', examplePersian: 'تو دوست من هستی.' },
      { id: 'm1d6w5', english: 'and', persian: 'و', pronunciation: 'ænd', example: 'You and I.', examplePersian: 'تو و من.' },
    ],
    sentences: [
      { id: 'm1d6s1', english: 'He is my friend.', persian: 'او دوست من است.', words: ['He', 'is', 'my', 'friend'] },
      { id: 'm1d6s2', english: 'She is nice.', persian: 'او خوبه.', words: ['She', 'is', 'nice'] },
      { id: 'm1d6s3', english: 'You and I are friends.', persian: 'تو و من دوست هستیم.', words: ['You', 'and', 'I', 'are', 'friends'] },
    ]
  },
  {
    day: 7,
    words: [
      { id: 'm1d7w1', english: 'this', persian: 'این', pronunciation: 'ðɪs', example: 'This is good.', examplePersian: 'این خوبه.' },
      { id: 'm1d7w2', english: 'that', persian: 'آن', pronunciation: 'ðæt', example: 'That is nice.', examplePersian: 'آن خوبه.' },
      { id: 'm1d7w3', english: 'it', persian: 'آن (غیرجاندار)', pronunciation: 'ɪt', example: 'It is good.', examplePersian: 'آن خوبه.' },
      { id: 'm1d7w4', english: 'we', persian: 'ما', pronunciation: 'wiː', example: 'We are friends.', examplePersian: 'ما دوست هستیم.' },
      { id: 'm1d7w5', english: 'they', persian: 'آنها', pronunciation: 'ðeɪ', example: 'They are nice.', examplePersian: 'آنها خوب هستند.' },
    ],
    sentences: [
      { id: 'm1d7s1', english: 'This is my friend.', persian: 'این دوست من است.', words: ['This', 'is', 'my', 'friend'] },
      { id: 'm1d7s2', english: 'We are good.', persian: 'ما خوب هستیم.', words: ['We', 'are', 'good'] },
      { id: 'm1d7s3', english: 'They are nice.', persian: 'آنها خوب هستند.', words: ['They', 'are', 'nice'] },
    ]
  },
  {
    day: 8,
    words: [
      { id: 'm1d8w1', english: 'afternoon', persian: 'بعدازظهر', pronunciation: 'ˌæftərˈnuːn', example: 'Good afternoon!', examplePersian: 'عصر بخیر!' },
      { id: 'm1d8w2', english: 'evening', persian: 'عصر/شب', pronunciation: 'ˈiːvnɪŋ', example: 'Good evening!', examplePersian: 'عصر بخیر!' },
      { id: 'm1d8w3', english: 'night', persian: 'شب', pronunciation: 'naɪt', example: 'Good night!', examplePersian: 'شب بخیر!' },
      { id: 'm1d8w4', english: 'bye', persian: 'خداحافظ', pronunciation: 'baɪ', example: 'Bye, see you!', examplePersian: 'خداحافظ، می‌بینمت!' },
      { id: 'm1d8w5', english: 'goodbye', persian: 'خداحافظ', pronunciation: 'ˌɡʊdˈbaɪ', example: 'Goodbye my friend.', examplePersian: 'خداحافظ دوست من.' },
    ],
    sentences: [
      { id: 'm1d8s1', english: 'Good afternoon!', persian: 'عصر بخیر!', words: ['Good', 'afternoon'] },
      { id: 'm1d8s2', english: 'Good evening!', persian: 'عصر بخیر!', words: ['Good', 'evening'] },
      { id: 'm1d8s3', english: 'Goodbye, good night!', persian: 'خداحافظ، شب بخیر!', words: ['Goodbye', 'good', 'night'] },
    ]
  },
  {
    day: 9,
    words: [
      { id: 'm1d9w1', english: 'see', persian: 'دیدن', pronunciation: 'siː', example: 'I see you.', examplePersian: 'من تو را می‌بینم.' },
      { id: 'm1d9w2', english: 'later', persian: 'بعداً', pronunciation: 'ˈleɪtər', example: 'See you later.', examplePersian: 'بعداً می‌بینمت.' },
      { id: 'm1d9w3', english: 'soon', persian: 'زود/به‌زودی', pronunciation: 'suːn', example: 'See you soon.', examplePersian: 'به‌زودی می‌بینمت.' },
      { id: 'm1d9w4', english: 'tomorrow', persian: 'فردا', pronunciation: 'təˈmɑːroʊ', example: 'See you tomorrow.', examplePersian: 'فردا می‌بینمت.' },
      { id: 'm1d9w5', english: 'today', persian: 'امروز', pronunciation: 'təˈdeɪ', example: 'Today is good.', examplePersian: 'امروز خوبه.' },
    ],
    sentences: [
      { id: 'm1d9s1', english: 'See you later!', persian: 'بعداً می‌بینمت!', words: ['See', 'you', 'later'] },
      { id: 'm1d9s2', english: 'See you tomorrow.', persian: 'فردا می‌بینمت.', words: ['See', 'you', 'tomorrow'] },
      { id: 'm1d9s3', english: 'Today is nice.', persian: 'امروز خوبه.', words: ['Today', 'is', 'nice'] },
    ]
  },
  {
    day: 10,
    words: [
      { id: 'm1d10w1', english: 'happy', persian: 'خوشحال', pronunciation: 'ˈhæpi', example: 'I am happy.', examplePersian: 'من خوشحالم.' },
      { id: 'm1d10w2', english: 'sad', persian: 'غمگین', pronunciation: 'sæd', example: 'He is sad.', examplePersian: 'او غمگین است.' },
      { id: 'm1d10w3', english: 'tired', persian: 'خسته', pronunciation: 'ˈtaɪərd', example: 'I am tired.', examplePersian: 'من خسته‌ام.' },
      { id: 'm1d10w4', english: 'hungry', persian: 'گرسنه', pronunciation: 'ˈhʌŋɡri', example: 'Are you hungry?', examplePersian: 'گرسنه‌ای؟' },
      { id: 'm1d10w5', english: 'thirsty', persian: 'تشنه', pronunciation: 'ˈθɜːrsti', example: 'I am thirsty.', examplePersian: 'من تشنه‌ام.' },
    ],
    sentences: [
      { id: 'm1d10s1', english: 'I am happy today.', persian: 'امروز خوشحالم.', words: ['I', 'am', 'happy', 'today'] },
      { id: 'm1d10s2', english: 'Are you tired?', persian: 'خسته‌ای؟', words: ['Are', 'you', 'tired'] },
      { id: 'm1d10s3', english: 'She is hungry and thirsty.', persian: 'او گرسنه و تشنه است.', words: ['She', 'is', 'hungry', 'and', 'thirsty'] },
    ]
  },
  {
    day: 11,
    words: [
      { id: 'm1d11w1', english: 'very', persian: 'خیلی', pronunciation: 'ˈveri', example: 'I am very happy.', examplePersian: 'من خیلی خوشحالم.' },
      { id: 'm1d11w2', english: 'not', persian: 'نه/نیست', pronunciation: 'nɑːt', example: 'I am not sad.', examplePersian: 'من غمگین نیستم.' },
      { id: 'm1d11w3', english: 'here', persian: 'اینجا', pronunciation: 'hɪr', example: 'I am here.', examplePersian: 'من اینجام.' },
      { id: 'm1d11w4', english: 'there', persian: 'آنجا', pronunciation: 'ðer', example: 'He is there.', examplePersian: 'او آنجاست.' },
      { id: 'm1d11w5', english: 'where', persian: 'کجا', pronunciation: 'wer', example: 'Where are you?', examplePersian: 'کجایی؟' },
    ],
    sentences: [
      { id: 'm1d11s1', english: 'I am very happy.', persian: 'من خیلی خوشحالم.', words: ['I', 'am', 'very', 'happy'] },
      { id: 'm1d11s2', english: 'I am not tired.', persian: 'من خسته نیستم.', words: ['I', 'am', 'not', 'tired'] },
      { id: 'm1d11s3', english: 'Where are you?', persian: 'کجایی؟', words: ['Where', 'are', 'you'] },
    ]
  },
  {
    day: 12,
    words: [
      { id: 'm1d12w1', english: 'home', persian: 'خانه', pronunciation: 'hoʊm', example: 'I am at home.', examplePersian: 'من در خانه‌ام.' },
      { id: 'm1d12w2', english: 'at', persian: 'در/به', pronunciation: 'æt', example: 'I am at home.', examplePersian: 'من در خانه‌ام.' },
      { id: 'm1d12w3', english: 'work', persian: 'کار/محل کار', pronunciation: 'wɜːrk', example: 'I am at work.', examplePersian: 'من در محل کارم.' },
      { id: 'm1d12w4', english: 'school', persian: 'مدرسه', pronunciation: 'skuːl', example: 'She is at school.', examplePersian: 'او در مدرسه است.' },
      { id: 'm1d12w5', english: 'now', persian: 'الان', pronunciation: 'naʊ', example: 'I am here now.', examplePersian: 'الان اینجام.' },
    ],
    sentences: [
      { id: 'm1d12s1', english: 'I am at home now.', persian: 'الان در خانه‌ام.', words: ['I', 'am', 'at', 'home', 'now'] },
      { id: 'm1d12s2', english: 'He is at work.', persian: 'او در محل کار است.', words: ['He', 'is', 'at', 'work'] },
      { id: 'm1d12s3', english: 'Where is she? She is at school.', persian: 'او کجاست؟ او در مدرسه است.', words: ['Where', 'is', 'she', 'at', 'school'] },
    ]
  },
  {
    day: 13,
    words: [
      { id: 'm1d13w1', english: 'one', persian: 'یک', pronunciation: 'wʌn', example: 'I have one book.', examplePersian: 'من یک کتاب دارم.' },
      { id: 'm1d13w2', english: 'two', persian: 'دو', pronunciation: 'tuː', example: 'I have two friends.', examplePersian: 'من دو دوست دارم.' },
      { id: 'm1d13w3', english: 'three', persian: 'سه', pronunciation: 'θriː', example: 'There are three.', examplePersian: 'سه تا هست.' },
      { id: 'm1d13w4', english: 'four', persian: 'چهار', pronunciation: 'fɔːr', example: 'I see four.', examplePersian: 'من چهار تا می‌بینم.' },
      { id: 'm1d13w5', english: 'five', persian: 'پنج', pronunciation: 'faɪv', example: 'Five is good.', examplePersian: 'پنج خوبه.' },
    ],
    sentences: [
      { id: 'm1d13s1', english: 'I have one friend here.', persian: 'من اینجا یک دوست دارم.', words: ['I', 'have', 'one', 'friend', 'here'] },
      { id: 'm1d13s2', english: 'There are two.', persian: 'دو تا هست.', words: ['There', 'are', 'two'] },
      { id: 'm1d13s3', english: 'One, two, three, four, five.', persian: 'یک، دو، سه، چهار، پنج.', words: ['One', 'two', 'three', 'four', 'five'] },
    ]
  },
  {
    day: 14,
    words: [
      { id: 'm1d14w1', english: 'six', persian: 'شش', pronunciation: 'sɪks', example: 'I see six.', examplePersian: 'من شش تا می‌بینم.' },
      { id: 'm1d14w2', english: 'seven', persian: 'هفت', pronunciation: 'ˈsevən', example: 'Seven days.', examplePersian: 'هفت روز.' },
      { id: 'm1d14w3', english: 'eight', persian: 'هشت', pronunciation: 'eɪt', example: 'Eight friends.', examplePersian: 'هشت دوست.' },
      { id: 'm1d14w4', english: 'nine', persian: 'نه', pronunciation: 'naɪn', example: 'Nine is nice.', examplePersian: 'نُه خوبه.' },
      { id: 'm1d14w5', english: 'ten', persian: 'ده', pronunciation: 'ten', example: 'I have ten.', examplePersian: 'من ده تا دارم.' },
    ],
    sentences: [
      { id: 'm1d14s1', english: 'Six, seven, eight, nine, ten.', persian: 'شش، هفت، هشت، نه، ده.', words: ['Six', 'seven', 'eight', 'nine', 'ten'] },
      { id: 'm1d14s2', english: 'I see ten friends.', persian: 'من ده دوست می‌بینم.', words: ['I', 'see', 'ten', 'friends'] },
    ]
  },
  {
    day: 15,
    words: [
      { id: 'm1d15w1', english: 'have', persian: 'داشتن', pronunciation: 'hæv', example: 'I have a book.', examplePersian: 'من یک کتاب دارم.' },
      { id: 'm1d15w2', english: 'has', persian: 'دارد', pronunciation: 'hæz', example: 'He has a car.', examplePersian: 'او یک ماشین دارد.' },
      { id: 'm1d15w3', english: 'a', persian: 'یک (حرف تعریف)', pronunciation: 'ə', example: 'I have a book.', examplePersian: 'من یک کتاب دارم.' },
      { id: 'm1d15w4', english: 'an', persian: 'یک (قبل از حروف صدادار)', pronunciation: 'ən', example: 'I have an apple.', examplePersian: 'من یک سیب دارم.' },
      { id: 'm1d15w5', english: 'the', persian: 'حرف تعریف معین', pronunciation: 'ðə', example: 'The book is good.', examplePersian: 'آن کتاب خوبه.' },
    ],
    sentences: [
      { id: 'm1d15s1', english: 'I have a book.', persian: 'من یک کتاب دارم.', words: ['I', 'have', 'a', 'book'] },
      { id: 'm1d15s2', english: 'She has an apple.', persian: 'او یک سیب دارد.', words: ['She', 'has', 'an', 'apple'] },
      { id: 'm1d15s3', english: 'The book is nice.', persian: 'آن کتاب خوبه.', words: ['The', 'book', 'is', 'nice'] },
    ]
  },
  {
    day: 16,
    words: [
      { id: 'm1d16w1', english: 'book', persian: 'کتاب', pronunciation: 'bʊk', example: 'I have a book.', examplePersian: 'من یک کتاب دارم.' },
      { id: 'm1d16w2', english: 'pen', persian: 'خودکار', pronunciation: 'pen', example: 'This is my pen.', examplePersian: 'این خودکار من است.' },
      { id: 'm1d16w3', english: 'phone', persian: 'تلفن', pronunciation: 'foʊn', example: 'My phone is here.', examplePersian: 'تلفن من اینجاست.' },
      { id: 'm1d16w4', english: 'bag', persian: 'کیف', pronunciation: 'bæɡ', example: 'I have a bag.', examplePersian: 'من یک کیف دارم.' },
      { id: 'm1d16w5', english: 'table', persian: 'میز', pronunciation: 'ˈteɪbl', example: 'The book is on the table.', examplePersian: 'کتاب روی میز است.' },
    ],
    sentences: [
      { id: 'm1d16s1', english: 'This is my book.', persian: 'این کتاب من است.', words: ['This', 'is', 'my', 'book'] },
      { id: 'm1d16s2', english: 'I have a pen and a bag.', persian: 'من یک خودکار و یک کیف دارم.', words: ['I', 'have', 'a', 'pen', 'and', 'a', 'bag'] },
      { id: 'm1d16s3', english: 'My phone is on the table.', persian: 'تلفن من روی میز است.', words: ['My', 'phone', 'is', 'on', 'the', 'table'] },
    ]
  },
  {
    day: 17,
    words: [
      { id: 'm1d17w1', english: 'on', persian: 'روی', pronunciation: 'ɑːn', example: 'The book is on the table.', examplePersian: 'کتاب روی میز است.' },
      { id: 'm1d17w2', english: 'in', persian: 'در/داخل', pronunciation: 'ɪn', example: 'The pen is in the bag.', examplePersian: 'خودکار داخل کیف است.' },
      { id: 'm1d17w3', english: 'chair', persian: 'صندلی', pronunciation: 'tʃer', example: 'I am on the chair.', examplePersian: 'من روی صندلی هستم.' },
      { id: 'm1d17w4', english: 'door', persian: 'در', pronunciation: 'dɔːr', example: 'The door is there.', examplePersian: 'در آنجاست.' },
      { id: 'm1d17w5', english: 'window', persian: 'پنجره', pronunciation: 'ˈwɪndoʊ', example: 'I see the window.', examplePersian: 'من پنجره را می‌بینم.' },
    ],
    sentences: [
      { id: 'm1d17s1', english: 'The book is on the chair.', persian: 'کتاب روی صندلی است.', words: ['The', 'book', 'is', 'on', 'the', 'chair'] },
      { id: 'm1d17s2', english: 'The pen is in the bag.', persian: 'خودکار داخل کیف است.', words: ['The', 'pen', 'is', 'in', 'the', 'bag'] },
      { id: 'm1d17s3', english: 'I see the door and the window.', persian: 'من در و پنجره را می‌بینم.', words: ['I', 'see', 'the', 'door', 'and', 'the', 'window'] },
    ]
  },
  {
    day: 18,
    words: [
      { id: 'm1d18w1', english: 'big', persian: 'بزرگ', pronunciation: 'bɪɡ', example: 'The house is big.', examplePersian: 'خانه بزرگ است.' },
      { id: 'm1d18w2', english: 'small', persian: 'کوچک', pronunciation: 'smɔːl', example: 'The bag is small.', examplePersian: 'کیف کوچک است.' },
      { id: 'm1d18w3', english: 'new', persian: 'جدید', pronunciation: 'nuː', example: 'I have a new phone.', examplePersian: 'من یک تلفن جدید دارم.' },
      { id: 'm1d18w4', english: 'old', persian: 'قدیمی', pronunciation: 'oʊld', example: 'The book is old.', examplePersian: 'کتاب قدیمی است.' },
      { id: 'm1d18w5', english: 'house', persian: 'خانه', pronunciation: 'haʊs', example: 'My house is big.', examplePersian: 'خانه من بزرگ است.' },
    ],
    sentences: [
      { id: 'm1d18s1', english: 'My house is big.', persian: 'خانه من بزرگ است.', words: ['My', 'house', 'is', 'big'] },
      { id: 'm1d18s2', english: 'I have a new phone.', persian: 'من یک تلفن جدید دارم.', words: ['I', 'have', 'a', 'new', 'phone'] },
      { id: 'm1d18s3', english: 'The old book is small.', persian: 'کتاب قدیمی کوچک است.', words: ['The', 'old', 'book', 'is', 'small'] },
    ]
  },
  {
    day: 19,
    words: [
      { id: 'm1d19w1', english: 'want', persian: 'خواستن', pronunciation: 'wɑːnt', example: 'I want a book.', examplePersian: 'من یک کتاب می‌خوام.' },
      { id: 'm1d19w2', english: 'need', persian: 'نیاز داشتن', pronunciation: 'niːd', example: 'I need help.', examplePersian: 'من کمک نیاز دارم.' },
      { id: 'm1d19w3', english: 'help', persian: 'کمک', pronunciation: 'help', example: 'Please help me.', examplePersian: 'لطفاً کمکم کن.' },
      { id: 'm1d19w4', english: 'can', persian: 'توانستن', pronunciation: 'kæn', example: 'I can help you.', examplePersian: 'من می‌تونم کمکت کنم.' },
      { id: 'm1d19w5', english: 'like', persian: 'دوست داشتن', pronunciation: 'laɪk', example: 'I like it.', examplePersian: 'من این رو دوست دارم.' },
    ],
    sentences: [
      { id: 'm1d19s1', english: 'I want a new book.', persian: 'من یک کتاب جدید می‌خوام.', words: ['I', 'want', 'a', 'new', 'book'] },
      { id: 'm1d19s2', english: 'I need help please.', persian: 'لطفاً من کمک نیاز دارم.', words: ['I', 'need', 'help', 'please'] },
      { id: 'm1d19s3', english: 'Can you help me?', persian: 'می‌تونی کمکم کنی؟', words: ['Can', 'you', 'help', 'me'] },
      { id: 'm1d19s4', english: 'I like my new phone.', persian: 'من تلفن جدیدم رو دوست دارم.', words: ['I', 'like', 'my', 'new', 'phone'] },
    ]
  },
  {
    day: 20,
    words: [
      { id: 'm1d20w1', english: 'water', persian: 'آب', pronunciation: 'ˈwɔːtər', example: 'I want water.', examplePersian: 'من آب می‌خوام.' },
      { id: 'm1d20w2', english: 'food', persian: 'غذا', pronunciation: 'fuːd', example: 'I need food.', examplePersian: 'من غذا نیاز دارم.' },
      { id: 'm1d20w3', english: 'apple', persian: 'سیب', pronunciation: 'ˈæpl', example: 'I have an apple.', examplePersian: 'من یک سیب دارم.' },
      { id: 'm1d20w4', english: 'eat', persian: 'خوردن', pronunciation: 'iːt', example: 'I want to eat.', examplePersian: 'من می‌خوام غذا بخورم.' },
      { id: 'm1d20w5', english: 'drink', persian: 'نوشیدن', pronunciation: 'drɪŋk', example: 'I want to drink water.', examplePersian: 'من می‌خوام آب بنوشم.' },
    ],
    sentences: [
      { id: 'm1d20s1', english: 'I am thirsty. I want water.', persian: 'من تشنه‌ام. آب می‌خوام.', words: ['I', 'am', 'thirsty', 'want', 'water'] },
      { id: 'm1d20s2', english: 'I am hungry. I need food.', persian: 'من گرسنه‌ام. غذا نیاز دارم.', words: ['I', 'am', 'hungry', 'need', 'food'] },
      { id: 'm1d20s3', english: 'I want to eat an apple.', persian: 'من می‌خوام یک سیب بخورم.', words: ['I', 'want', 'to', 'eat', 'an', 'apple'] },
    ]
  },
  {
    day: 21,
    words: [
      { id: 'm1d21w1', english: 'do', persian: 'انجام دادن', pronunciation: 'duː', example: 'What do you do?', examplePersian: 'چیکار می‌کنی؟' },
      { id: 'm1d21w2', english: 'go', persian: 'رفتن', pronunciation: 'ɡoʊ', example: 'I want to go.', examplePersian: 'من می‌خوام برم.' },
      { id: 'm1d21w3', english: 'come', persian: 'آمدن', pronunciation: 'kʌm', example: 'Please come here.', examplePersian: 'لطفاً بیا اینجا.' },
      { id: 'm1d21w4', english: 'know', persian: 'دانستن', pronunciation: 'noʊ', example: 'I know.', examplePersian: 'می‌دونم.' },
      { id: 'm1d21w5', english: 'think', persian: 'فکر کردن', pronunciation: 'θɪŋk', example: 'I think it is good.', examplePersian: 'فکر می‌کنم خوبه.' },
    ],
    sentences: [
      { id: 'm1d21s1', english: 'What do you want?', persian: 'چی می‌خوای؟', words: ['What', 'do', 'you', 'want'] },
      { id: 'm1d21s2', english: 'I want to go home.', persian: 'می‌خوام برم خونه.', words: ['I', 'want', 'to', 'go', 'home'] },
      { id: 'm1d21s3', english: 'Please come here.', persian: 'لطفاً بیا اینجا.', words: ['Please', 'come', 'here'] },
      { id: 'm1d21s4', english: 'I know. I think it is good.', persian: 'می‌دونم. فکر می‌کنم خوبه.', words: ['I', 'know', 'think', 'it', 'is', 'good'] },
    ]
  },
  {
    day: 22,
    words: [
      { id: 'm1d22w1', english: 'why', persian: 'چرا', pronunciation: 'waɪ', example: 'Why are you sad?', examplePersian: 'چرا غمگینی؟' },
      { id: 'm1d22w2', english: 'because', persian: 'چون', pronunciation: 'bɪˈkɔːz', example: 'Because I am tired.', examplePersian: 'چون خسته‌ام.' },
      { id: 'm1d22w3', english: 'when', persian: 'کی/چه وقت', pronunciation: 'wen', example: 'When do you go?', examplePersian: 'کی می‌ری؟' },
      { id: 'm1d22w4', english: 'who', persian: 'چه کسی', pronunciation: 'huː', example: 'Who is he?', examplePersian: 'او کیه؟' },
      { id: 'm1d22w5', english: 'but', persian: 'اما', pronunciation: 'bʌt', example: 'I am tired but happy.', examplePersian: 'خسته‌ام اما خوشحالم.' },
    ],
    sentences: [
      { id: 'm1d22s1', english: 'Why are you tired?', persian: 'چرا خسته‌ای؟', words: ['Why', 'are', 'you', 'tired'] },
      { id: 'm1d22s2', english: 'Because I am at work.', persian: 'چون در محل کار هستم.', words: ['Because', 'I', 'am', 'at', 'work'] },
      { id: 'm1d22s3', english: 'When do you come?', persian: 'کی میای؟', words: ['When', 'do', 'you', 'come'] },
      { id: 'm1d22s4', english: 'Who is your friend?', persian: 'دوستت کیه؟', words: ['Who', 'is', 'your', 'friend'] },
    ]
  },
  {
    day: 23,
    words: [
      { id: 'm1d23w1', english: 'really', persian: 'واقعاً', pronunciation: 'ˈriːəli', example: 'Really?', examplePersian: 'واقعاً؟' },
      { id: 'm1d23w2', english: 'of course', persian: 'البته', pronunciation: 'əv kɔːrs', example: 'Of course!', examplePersian: 'البته!' },
      { id: 'm1d23w3', english: 'maybe', persian: 'شاید', pronunciation: 'ˈmeɪbi', example: 'Maybe tomorrow.', examplePersian: 'شاید فردا.' },
      { id: 'm1d23w4', english: 'okay', persian: 'باشه', pronunciation: 'oʊˈkeɪ', example: 'Okay, thank you.', examplePersian: 'باشه، ممنون.' },
      { id: 'm1d23w5', english: 'sure', persian: 'حتماً', pronunciation: 'ʃʊr', example: 'Sure, I can help.', examplePersian: 'حتماً، می‌تونم کمک کنم.' },
    ],
    sentences: [
      { id: 'm1d23s1', english: 'Really? I do not know.', persian: 'واقعاً؟ نمی‌دونم.', words: ['Really', 'I', 'do', 'not', 'know'] },
      { id: 'm1d23s2', english: 'Of course I can help you.', persian: 'البته می‌تونم کمکت کنم.', words: ['Of', 'course', 'I', 'can', 'help', 'you'] },
      { id: 'm1d23s3', english: 'Maybe I come tomorrow.', persian: 'شاید فردا بیام.', words: ['Maybe', 'I', 'come', 'tomorrow'] },
    ]
  },
  {
    day: 24,
    words: [
      { id: 'm1d24w1', english: 'let', persian: 'اجازه دادن', pronunciation: 'let', example: 'Let me help you.', examplePersian: 'بذار کمکت کنم.' },
      { id: 'm1d24w2', english: 'wait', persian: 'صبر کردن', pronunciation: 'weɪt', example: 'Please wait.', examplePersian: 'لطفاً صبر کن.' },
      { id: 'm1d24w3', english: 'look', persian: 'نگاه کردن', pronunciation: 'lʊk', example: 'Look at this.', examplePersian: 'به این نگاه کن.' },
      { id: 'm1d24w4', english: 'listen', persian: 'گوش دادن', pronunciation: 'ˈlɪsn', example: 'Listen please.', examplePersian: 'لطفاً گوش کن.' },
      { id: 'm1d24w5', english: 'say', persian: 'گفتن', pronunciation: 'seɪ', example: 'What do you say?', examplePersian: 'چی می‌گی؟' },
    ],
    sentences: [
      { id: 'm1d24s1', english: 'Let me help you.', persian: 'بذار کمکت کنم.', words: ['Let', 'me', 'help', 'you'] },
      { id: 'm1d24s2', english: 'Please wait here.', persian: 'لطفاً اینجا صبر کن.', words: ['Please', 'wait', 'here'] },
      { id: 'm1d24s3', english: 'Look at this. What do you say?', persian: 'به این نگاه کن. چی می‌گی؟', words: ['Look', 'at', 'this', 'What', 'do', 'you', 'say'] },
    ]
  },
  {
    day: 25,
    words: [
      { id: 'm1d25w1', english: 'understand', persian: 'فهمیدن', pronunciation: 'ˌʌndərˈstænd', example: 'I understand.', examplePersian: 'می‌فهمم.' },
      { id: 'm1d25w2', english: 'speak', persian: 'صحبت کردن', pronunciation: 'spiːk', example: 'I speak English.', examplePersian: 'من انگلیسی صحبت می‌کنم.' },
      { id: 'm1d25w3', english: 'English', persian: 'انگلیسی', pronunciation: 'ˈɪŋɡlɪʃ', example: 'I like English.', examplePersian: 'من انگلیسی رو دوست دارم.' },
      { id: 'm1d25w4', english: 'learn', persian: 'یاد گرفتن', pronunciation: 'lɜːrn', example: 'I want to learn.', examplePersian: 'می‌خوام یاد بگیرم.' },
      { id: 'm1d25w5', english: 'try', persian: 'تلاش کردن', pronunciation: 'traɪ', example: 'I try my best.', examplePersian: 'تمام تلاشم رو می‌کنم.' },
    ],
    sentences: [
      { id: 'm1d25s1', english: 'I understand. Thank you.', persian: 'می‌فهمم. ممنون.', words: ['I', 'understand', 'Thank', 'you'] },
      { id: 'm1d25s2', english: 'I want to learn English.', persian: 'می‌خوام انگلیسی یاد بگیرم.', words: ['I', 'want', 'to', 'learn', 'English'] },
      { id: 'm1d25s3', english: 'I try to speak English.', persian: 'تلاش می‌کنم انگلیسی صحبت کنم.', words: ['I', 'try', 'to', 'speak', 'English'] },
    ]
  },
];

// Generate remaining months with similar structure
const generateMonth = (monthNum: number, level: string, title: string): MonthData => {
  const codes: { [key: number]: string } = {
    1: '33',
    2: '44',
    3: '234',
    4: '1234',
    5: '676'
  };

  // For months 2-5, generate progressively harder content
  const days: DayContent[] = [];
  
  for (let day = 1; day <= 25; day++) {
    const words: Word[] = [];
    const sentences: Sentence[] = [];
    
    // Generate words based on month and day
    const wordBases = getWordsForMonthDay(monthNum, day);
    wordBases.forEach((w, i) => {
      words.push({
        id: `m${monthNum}d${day}w${i + 1}`,
        english: w.english,
        persian: w.persian,
        pronunciation: w.pronunciation,
        example: w.example,
        examplePersian: w.examplePersian
      });
    });

    const sentenceBases = getSentencesForMonthDay(monthNum, day);
    sentenceBases.forEach((s, i) => {
      sentences.push({
        id: `m${monthNum}d${day}s${i + 1}`,
        english: s.english,
        persian: s.persian,
        words: s.english.replace(/[.,!?]/g, '').split(' ')
      });
    });

    days.push({ day, words, sentences });
  }

  return {
    month: monthNum,
    title,
    level,
    days,
    unlockCode: codes[monthNum]
  };
};

// Word data for different months
function getWordsForMonthDay(month: number, day: number): Omit<Word, 'id'>[] {
  const monthData: { [key: number]: { [key: number]: Omit<Word, 'id'>[] } } = {
    2: {
      1: [
        { english: 'family', persian: 'خانواده', pronunciation: 'ˈfæməli', example: 'I love my family.', examplePersian: 'من خانواده‌ام را دوست دارم.' },
        { english: 'mother', persian: 'مادر', pronunciation: 'ˈmʌðər', example: 'My mother is nice.', examplePersian: 'مادرم خوبه.' },
        { english: 'father', persian: 'پدر', pronunciation: 'ˈfɑːðər', example: 'My father is at work.', examplePersian: 'پدرم سر کاره.' },
        { english: 'brother', persian: 'برادر', pronunciation: 'ˈbrʌðər', example: 'I have a brother.', examplePersian: 'من یک برادر دارم.' },
        { english: 'sister', persian: 'خواهر', pronunciation: 'ˈsɪstər', example: 'My sister is young.', examplePersian: 'خواهرم جوانه.' },
      ],
      2: [
        { english: 'love', persian: 'عشق/دوست داشتن', pronunciation: 'lʌv', example: 'I love you.', examplePersian: 'دوستت دارم.' },
        { english: 'young', persian: 'جوان', pronunciation: 'jʌŋ', example: 'He is young.', examplePersian: 'او جوانه.' },
        { english: 'child', persian: 'بچه', pronunciation: 'tʃaɪld', example: 'I have a child.', examplePersian: 'من یک بچه دارم.' },
        { english: 'baby', persian: 'نوزاد', pronunciation: 'ˈbeɪbi', example: 'The baby is small.', examplePersian: 'نوزاد کوچکه.' },
        { english: 'parent', persian: 'والدین', pronunciation: 'ˈperənt', example: 'My parents are at home.', examplePersian: 'والدینم خانه هستند.' },
      ],
      3: [
        { english: 'live', persian: 'زندگی کردن', pronunciation: 'lɪv', example: 'I live here.', examplePersian: 'من اینجا زندگی می‌کنم.' },
        { english: 'with', persian: 'با', pronunciation: 'wɪð', example: 'I live with my family.', examplePersian: 'من با خانواده‌ام زندگی می‌کنم.' },
        { english: 'together', persian: 'با هم', pronunciation: 'təˈɡeðər', example: 'We are together.', examplePersian: 'ما با هم هستیم.' },
        { english: 'husband', persian: 'شوهر', pronunciation: 'ˈhʌzbənd', example: 'He is my husband.', examplePersian: 'او شوهرمه.' },
        { english: 'wife', persian: 'همسر (زن)', pronunciation: 'waɪf', example: 'She is my wife.', examplePersian: 'او همسرمه.' },
      ],
      // Add more days...
    },
    3: {
      1: [
        { english: 'breakfast', persian: 'صبحانه', pronunciation: 'ˈbrekfəst', example: 'I eat breakfast.', examplePersian: 'من صبحانه می‌خورم.' },
        { english: 'lunch', persian: 'ناهار', pronunciation: 'lʌntʃ', example: 'Lunch is ready.', examplePersian: 'ناهار آماده است.' },
        { english: 'dinner', persian: 'شام', pronunciation: 'ˈdɪnər', example: 'I have dinner at home.', examplePersian: 'من شام در خانه می‌خورم.' },
        { english: 'ready', persian: 'آماده', pronunciation: 'ˈredi', example: 'I am ready.', examplePersian: 'من آماده‌ام.' },
        { english: 'cook', persian: 'پختن/آشپز', pronunciation: 'kʊk', example: 'I can cook.', examplePersian: 'من می‌توانم آشپزی کنم.' },
      ],
    },
    4: {
      1: [
        { english: 'travel', persian: 'سفر کردن', pronunciation: 'ˈtrævl', example: 'I like to travel.', examplePersian: 'من سفر کردن را دوست دارم.' },
        { english: 'country', persian: 'کشور', pronunciation: 'ˈkʌntri', example: 'This country is beautiful.', examplePersian: 'این کشور زیباست.' },
        { english: 'city', persian: 'شهر', pronunciation: 'ˈsɪti', example: 'The city is big.', examplePersian: 'شهر بزرگه.' },
        { english: 'visit', persian: 'بازدید کردن', pronunciation: 'ˈvɪzɪt', example: 'I want to visit you.', examplePersian: 'می‌خوام بهت سر بزنم.' },
        { english: 'beautiful', persian: 'زیبا', pronunciation: 'ˈbjuːtɪfl', example: 'It is beautiful.', examplePersian: 'این زیباست.' },
      ],
    },
    5: {
      1: [
        { english: 'future', persian: 'آینده', pronunciation: 'ˈfjuːtʃər', example: 'I think about the future.', examplePersian: 'من به آینده فکر می‌کنم.' },
        { english: 'dream', persian: 'رویا', pronunciation: 'driːm', example: 'I have a dream.', examplePersian: 'من یک رویا دارم.' },
        { english: 'goal', persian: 'هدف', pronunciation: 'ɡoʊl', example: 'What is your goal?', examplePersian: 'هدفت چیه؟' },
        { english: 'achieve', persian: 'دستیابی', pronunciation: 'əˈtʃiːv', example: 'I can achieve my goals.', examplePersian: 'می‌تونم به اهدافم برسم.' },
        { english: 'success', persian: 'موفقیت', pronunciation: 'səkˈses', example: 'I want success.', examplePersian: 'من موفقیت می‌خوام.' },
      ],
    },
  };

  // Return words for the specific month and day, or generate default
  if (monthData[month] && monthData[month][day]) {
    return monthData[month][day];
  }

  // Default words for any day not specifically defined
  return [
    { english: 'word' + ((month * 100) + day), persian: 'کلمه ' + day, pronunciation: 'wɜːrd', example: 'This is word ' + day, examplePersian: 'این کلمه ' + day + ' است.' },
    { english: 'example', persian: 'مثال', pronunciation: 'ɪɡˈzæmpl', example: 'This is an example.', examplePersian: 'این یک مثال است.' },
    { english: 'practice', persian: 'تمرین', pronunciation: 'ˈpræktɪs', example: 'I practice every day.', examplePersian: 'من هر روز تمرین می‌کنم.' },
    { english: 'study', persian: 'مطالعه', pronunciation: 'ˈstʌdi', example: 'I study English.', examplePersian: 'من انگلیسی می‌خوانم.' },
    { english: 'improve', persian: 'بهبود', pronunciation: 'ɪmˈpruːv', example: 'I want to improve.', examplePersian: 'می‌خوام پیشرفت کنم.' },
  ];
}

function getSentencesForMonthDay(month: number, day: number): Omit<Sentence, 'id' | 'words'>[] {
  const monthData: { [key: number]: { [key: number]: Omit<Sentence, 'id' | 'words'>[] } } = {
    2: {
      1: [
        { english: 'I love my family.', persian: 'من خانواده‌ام را دوست دارم.' },
        { english: 'My mother and father are at home.', persian: 'مادر و پدرم خانه هستند.' },
        { english: 'I have a brother and a sister.', persian: 'من یک برادر و یک خواهر دارم.' },
      ],
      2: [
        { english: 'I love my mother.', persian: 'من مادرم را دوست دارم.' },
        { english: 'The baby is very young.', persian: 'نوزاد خیلی کوچیکه.' },
        { english: 'My parents are nice.', persian: 'والدینم خوب هستند.' },
      ],
      3: [
        { english: 'I live with my family.', persian: 'من با خانواده‌ام زندگی می‌کنم.' },
        { english: 'We are together at home.', persian: 'ما با هم خانه هستیم.' },
        { english: 'My husband is at work.', persian: 'شوهرم سر کاره.' },
      ],
    },
    3: {
      1: [
        { english: 'I eat breakfast in the morning.', persian: 'من صبح صبحانه می‌خورم.' },
        { english: 'Lunch is ready. Come please.', persian: 'ناهار آماده است. بیا لطفاً.' },
        { english: 'I can cook dinner.', persian: 'من می‌توانم شام بپزم.' },
      ],
    },
    4: {
      1: [
        { english: 'I like to travel to new countries.', persian: 'من دوست دارم به کشورهای جدید سفر کنم.' },
        { english: 'This city is very beautiful.', persian: 'این شهر خیلی زیباست.' },
        { english: 'I want to visit my friend.', persian: 'می‌خوام به دوستم سر بزنم.' },
      ],
    },
    5: {
      1: [
        { english: 'I think about my future.', persian: 'به آینده‌ام فکر می‌کنم.' },
        { english: 'I have a dream and a goal.', persian: 'من یک رویا و یک هدف دارم.' },
        { english: 'I can achieve success.', persian: 'می‌توانم به موفقیت برسم.' },
      ],
    },
  };

  if (monthData[month] && monthData[month][day]) {
    return monthData[month][day];
  }

  return [
    { english: 'I study English every day.', persian: 'من هر روز انگلیسی می‌خوانم.' },
    { english: 'Practice makes perfect.', persian: 'تمرین کمال می‌آورد.' },
    { english: 'I want to improve my English.', persian: 'می‌خوام انگلیسی‌ام را بهتر کنم.' },
  ];
}

// Generate all course data
export const courseData: MonthData[] = [
  {
    month: 1,
    title: 'سلام و احوالپرسی',
    level: 'Very Beginner',
    days: month1Days,
    unlockCode: '33'
  },
  generateMonth(2, 'Beginner', 'خانواده و روابط'),
  generateMonth(3, 'Elementary', 'زندگی روزمره'),
  generateMonth(4, 'Elementary+', 'سفر و مکان‌ها'),
  generateMonth(5, 'Pre-Intermediate', 'آینده و اهداف'),
];

// Helper function to get all words up to a specific month and day
export function getAllLearnedWords(month: number, day: number): Word[] {
  const words: Word[] = [];
  
  for (const monthData of courseData) {
    if (monthData.month > month) break;
    
    for (const dayData of monthData.days) {
      if (monthData.month === month && dayData.day > day) break;
      if (dayData.day <= 25) { // Only learning days
        words.push(...dayData.words);
      }
    }
  }
  
  return words;
}

// Helper function to get all sentences up to a specific month and day
export function getAllLearnedSentences(month: number, day: number): Sentence[] {
  const sentences: Sentence[] = [];
  
  for (const monthData of courseData) {
    if (monthData.month > month) break;
    
    for (const dayData of monthData.days) {
      if (monthData.month === month && dayData.day > day) break;
      if (dayData.day <= 25) { // Only learning days
        sentences.push(...dayData.sentences);
      }
    }
  }
  
  return sentences;
}

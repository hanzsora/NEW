export interface Question {
  id: number;
  text: {
    en: string;
    ms: string;
  };
  options: {
    value: number;
    label: {
      en: string;
      ms: string;
    };
  }[];
  crisisFlag?: boolean;
}

export interface Questionnaire {
  id: string;
  name: {
    en: string;
    ms: string;
  };
  description: {
    en: string;
    ms: string;
  };
  instruction: {
    en: string;
    ms: string;
  };
  questions: Question[];
  scoring: {
    type: 'sum' | 'subscale' | 'reverse';
    ranges: {
      min: number;
      max: number;
      level: string;
      color: string;
      feedback: {
        en: string;
        ms: string;
      };
    }[];
  };
}

export const questionnaires: Record<string, Questionnaire> = {
  PHQ9: {
    id: 'PHQ9',
    name: {
      en: 'PHQ-9: Patient Health Questionnaire',
      ms: 'PHQ-9: Soal Selidik Kesihatan Pesakit'
    },
    description: {
      en: 'Depression Screening Tool',
      ms: 'Alat Saringan Kemurungan'
    },
    instruction: {
      en: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
      ms: 'Dalam 2 minggu yang lalu, berapa kerap anda diganggu oleh mana-mana masalah berikut?'
    },
    questions: [
      {
        id: 1,
        text: {
          en: 'Little interest or pleasure in doing things',
          ms: 'Kurang minat atau keseronokan dalam melakukan sesuatu'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 2,
        text: {
          en: 'Feeling down, depressed, or hopeless',
          ms: 'Berasa sedih, murung, atau putus asa'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 3,
        text: {
          en: 'Trouble falling or staying asleep, or sleeping too much',
          ms: 'Masalah untuk tidur atau tidur terlalu banyak'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 4,
        text: {
          en: 'Feeling tired or having little energy',
          ms: 'Berasa letih atau kurang tenaga'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 5,
        text: {
          en: 'Poor appetite or overeating',
          ms: 'Selera makan yang lemah atau makan berlebihan'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 6,
        text: {
          en: 'Feeling bad about yourself or that you are a failure or have let yourself or your family down',
          ms: 'Berasa buruk tentang diri sendiri atau bahawa anda adalah kegagalan atau telah mengecewakan diri sendiri atau keluarga anda'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 7,
        text: {
          en: 'Trouble concentrating on things, such as reading the newspaper or watching television',
          ms: 'Masalah menumpukan perhatian pada sesuatu, seperti membaca surat khabar atau menonton televisyen'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 8,
        text: {
          en: 'Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual',
          ms: 'Bergerak atau bercakap dengan perlahan sehingga orang lain dapat menyedarinya. Atau sebaliknya - begitu gelisah atau resah sehingga anda telah bergerak lebih banyak daripada biasa'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 9,
        text: {
          en: 'Thoughts that you would be better off dead, or of hurting yourself',
          ms: 'Fikiran bahawa anda lebih baik mati, atau mencederakan diri sendiri'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ],
        crisisFlag: true
      }
    ],
    scoring: {
      type: 'sum',
      ranges: [
        {
          min: 0,
          max: 4,
          level: 'minimal',
          color: 'green',
          feedback: {
            en: 'Your score suggests minimal depression symptoms. Continue with healthy habits and self-care.',
            ms: 'Skor anda menunjukkan gejala kemurungan yang minimum. Teruskan dengan tabiat sihat dan penjagaan diri.'
          }
        },
        {
          min: 5,
          max: 9,
          level: 'mild',
          color: 'yellow',
          feedback: {
            en: 'Your score indicates mild depression symptoms. Consider talking to a counselor and practicing stress management techniques.',
            ms: 'Skor anda menunjukkan gejala kemurungan yang ringan. Pertimbangkan untuk bercakap dengan kaunselor dan mengamalkan teknik pengurusan tekanan.'
          }
        },
        {
          min: 10,
          max: 14,
          level: 'moderate',
          color: 'orange',
          feedback: {
            en: 'Your score suggests moderate depression. We recommend seeking support from a mental health professional.',
            ms: 'Skor anda menunjukkan kemurungan sederhana. Kami mengesyorkan untuk mendapatkan sokongan daripada profesional kesihatan mental.'
          }
        },
        {
          min: 15,
          max: 19,
          level: 'moderatelySevere',
          color: 'red',
          feedback: {
            en: 'Your score indicates moderately severe depression. Please consult with a mental health professional soon.',
            ms: 'Skor anda menunjukkan kemurungan yang agak teruk. Sila berjumpa dengan profesional kesihatan mental tidak lama lagi.'
          }
        },
        {
          min: 20,
          max: 27,
          level: 'severe',
          color: 'red',
          feedback: {
            en: 'Your score suggests severe depression. Please seek immediate help from a mental health professional.',
            ms: 'Skor anda menunjukkan kemurungan yang teruk. Sila dapatkan bantuan segera daripada profesional kesihatan mental.'
          }
        }
      ]
    }
  },
  GAD7: {
    id: 'GAD7',
    name: {
      en: 'GAD-7: Generalized Anxiety Disorder',
      ms: 'GAD-7: Gangguan Kebimbangan Umum'
    },
    description: {
      en: 'Anxiety Screening Tool',
      ms: 'Alat Saringan Kebimbangan'
    },
    instruction: {
      en: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
      ms: 'Dalam 2 minggu yang lalu, berapa kerap anda diganggu oleh masalah berikut?'
    },
    questions: [
      {
        id: 1,
        text: {
          en: 'Feeling nervous, anxious, or on edge',
          ms: 'Berasa gementar, bimbang, atau tegang'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 2,
        text: {
          en: 'Not being able to stop or control worrying',
          ms: 'Tidak dapat berhenti atau mengawal kebimbangan'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 3,
        text: {
          en: 'Worrying too much about different things',
          ms: 'Terlalu bimbang tentang pelbagai perkara'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 4,
        text: {
          en: 'Trouble relaxing',
          ms: 'Masalah untuk berehat'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 5,
        text: {
          en: 'Being so restless that it is hard to sit still',
          ms: 'Begitu gelisah sehingga sukar untuk duduk diam'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 6,
        text: {
          en: 'Becoming easily annoyed or irritable',
          ms: 'Mudah marah atau mudah tersinggung'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      },
      {
        id: 7,
        text: {
          en: 'Feeling afraid, as if something awful might happen',
          ms: 'Berasa takut, seolah-olah sesuatu yang mengerikan mungkin berlaku'
        },
        options: [
          { value: 0, label: { en: 'Not at all', ms: 'Tidak sama sekali' } },
          { value: 1, label: { en: 'Several days', ms: 'Beberapa hari' } },
          { value: 2, label: { en: 'More than half the days', ms: 'Lebih separuh hari' } },
          { value: 3, label: { en: 'Nearly every day', ms: 'Hampir setiap hari' } }
        ]
      }
    ],
    scoring: {
      type: 'sum',
      ranges: [
        {
          min: 0,
          max: 4,
          level: 'minimal',
          color: 'green',
          feedback: {
            en: 'Your score suggests minimal anxiety symptoms. Continue practicing stress management and self-care.',
            ms: 'Skor anda menunjukkan gejala kebimbangan yang minimum. Teruskan mengamalkan pengurusan tekanan dan penjagaan diri.'
          }
        },
        {
          min: 5,
          max: 9,
          level: 'mild',
          color: 'yellow',
          feedback: {
            en: 'Your score indicates mild anxiety. Consider relaxation techniques and talking to someone you trust.',
            ms: 'Skor anda menunjukkan kebimbangan yang ringan. Pertimbangkan teknik relaksasi dan bercakap dengan seseorang yang anda percayai.'
          }
        },
        {
          min: 10,
          max: 14,
          level: 'moderate',
          color: 'orange',
          feedback: {
            en: 'Your score suggests moderate anxiety. We recommend consulting with a mental health professional.',
            ms: 'Skor anda menunjukkan kebimbangan sederhana. Kami mengesyorkan untuk berjumpa dengan profesional kesihatan mental.'
          }
        },
        {
          min: 15,
          max: 21,
          level: 'severe',
          color: 'red',
          feedback: {
            en: 'Your score indicates severe anxiety. Please seek professional help soon.',
            ms: 'Skor anda menunjukkan kebimbangan yang teruk. Sila dapatkan bantuan profesional tidak lama lagi.'
          }
        }
      ]
    }
  },
  DASS21: {
    id: 'DASS21',
    name: {
      en: 'DASS-21: Depression Anxiety Stress Scales',
      ms: 'DASS-21: Skala Kemurungan Kebimbangan Tekanan'
    },
    description: {
      en: 'Comprehensive Mental Health Assessment',
      ms: 'Penilaian Kesihatan Mental Menyeluruh'
    },
    instruction: {
      en: 'Please read each statement and select the option that indicates how much the statement applied to you over the past week.',
      ms: 'Sila baca setiap pernyataan dan pilih pilihan yang menunjukkan berapa banyak pernyataan itu terpakai kepada anda sepanjang minggu lalu.'
    },
    questions: [
      {
        id: 1,
        text: {
          en: 'I found it hard to wind down',
          ms: 'Saya mendapati sukar untuk berehat'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 2,
        text: {
          en: 'I was aware of dryness of my mouth',
          ms: 'Saya sedar mulut saya kering'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 3,
        text: {
          en: "I couldn't seem to experience any positive feeling at all",
          ms: 'Saya tidak dapat mengalami sebarang perasaan positif sama sekali'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 4,
        text: {
          en: 'I experienced breathing difficulty (eg, excessively rapid breathing, breathlessness)',
          ms: 'Saya mengalami kesukaran bernafas (cth, pernafasan terlalu cepat, sesak nafas)'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 5,
        text: {
          en: 'I found it difficult to work up the initiative to do things',
          ms: 'Saya mendapati sukar untuk mengambil inisiatif untuk melakukan sesuatu'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 6,
        text: {
          en: 'I tended to over-react to situations',
          ms: 'Saya cenderung untuk bertindak balas berlebihan terhadap situasi'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 7,
        text: {
          en: 'I experienced trembling (eg, in the hands)',
          ms: 'Saya mengalami gegaran (cth, di tangan)'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 8,
        text: {
          en: 'I felt that I was using a lot of nervous energy',
          ms: 'Saya rasa saya menggunakan banyak tenaga saraf'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 9,
        text: {
          en: 'I was worried about situations in which I might panic and make a fool of myself',
          ms: 'Saya bimbang tentang situasi di mana saya mungkin panik dan membuat diri saya kelihatan bodoh'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 10,
        text: {
          en: 'I felt that I had nothing to look forward to',
          ms: 'Saya rasa saya tidak mempunyai apa-apa untuk dinanti-nantikan'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 11,
        text: {
          en: 'I found myself getting agitated',
          ms: 'Saya mendapati diri saya menjadi gelisah'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 12,
        text: {
          en: 'I found it difficult to relax',
          ms: 'Saya mendapati sukar untuk berehat'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 13,
        text: {
          en: 'I felt down-hearted and blue',
          ms: 'Saya rasa sedih dan murung'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 14,
        text: {
          en: 'I was intolerant of anything that kept me from getting on with what I was doing',
          ms: 'Saya tidak bertoleransi terhadap apa-apa yang menghalang saya daripada meneruskan apa yang saya lakukan'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 15,
        text: {
          en: 'I felt I was close to panic',
          ms: 'Saya rasa saya hampir panik'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 16,
        text: {
          en: 'I was unable to become enthusiastic about anything',
          ms: 'Saya tidak dapat menjadi bersemangat tentang apa-apa'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 17,
        text: {
          en: "I felt I wasn't worth much as a person",
          ms: 'Saya rasa saya tidak bernilai sebagai seorang insan'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 18,
        text: {
          en: 'I felt that I was rather touchy',
          ms: 'Saya rasa saya agak sensitif'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 19,
        text: {
          en: 'I was aware of the action of my heart in the absence of physical exertion',
          ms: 'Saya sedar tentang tindakan jantung saya tanpa senaman fizikal'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 20,
        text: {
          en: 'I felt scared without any good reason',
          ms: 'Saya rasa takut tanpa sebarang sebab yang baik'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ]
      },
      {
        id: 21,
        text: {
          en: 'I felt that life was meaningless',
          ms: 'Saya rasa hidup tidak bermakna'
        },
        options: [
          { value: 0, label: { en: 'Did not apply to me at all', ms: 'Tidak terpakai kepada saya sama sekali' } },
          { value: 1, label: { en: 'Applied to me to some degree', ms: 'Terpakai kepada saya sedikit' } },
          { value: 2, label: { en: 'Applied to me a considerable degree', ms: 'Terpakai kepada saya banyak' } },
          { value: 3, label: { en: 'Applied to me very much', ms: 'Terpakai kepada saya sangat banyak' } }
        ],
        crisisFlag: true
      }
    ],
    scoring: {
      type: 'subscale',
      ranges: []
    }
  },
  WHO5: {
    id: 'WHO5',
    name: {
      en: 'WHO-5: Well-Being Index',
      ms: 'WHO-5: Indeks Kesejahteraan'
    },
    description: {
      en: 'Wellbeing Assessment',
      ms: 'Penilaian Kesejahteraan'
    },
    instruction: {
      en: 'Please indicate for each of the five statements which is closest to how you have been feeling over the last two weeks.',
      ms: 'Sila nyatakan bagi setiap daripada lima pernyataan yang paling dekat dengan perasaan anda sepanjang dua minggu yang lalu.'
    },
    questions: [
      {
        id: 1,
        text: {
          en: 'I have felt cheerful and in good spirits',
          ms: 'Saya berasa ceria dan bersemangat'
        },
        options: [
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 3, label: { en: 'More than half the time', ms: 'Lebih separuh masa' } },
          { value: 2, label: { en: 'Less than half the time', ms: 'Kurang separuh masa' } },
          { value: 1, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 0, label: { en: 'At no time', ms: 'Tidak sama sekali' } }
        ]
      },
      {
        id: 2,
        text: {
          en: 'I have felt calm and relaxed',
          ms: 'Saya berasa tenang dan santai'
        },
        options: [
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 3, label: { en: 'More than half the time', ms: 'Lebih separuh masa' } },
          { value: 2, label: { en: 'Less than half the time', ms: 'Kurang separuh masa' } },
          { value: 1, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 0, label: { en: 'At no time', ms: 'Tidak sama sekali' } }
        ]
      },
      {
        id: 3,
        text: {
          en: 'I have felt active and vigorous',
          ms: 'Saya berasa aktif dan cergas'
        },
        options: [
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 3, label: { en: 'More than half the time', ms: 'Lebih separuh masa' } },
          { value: 2, label: { en: 'Less than half the time', ms: 'Kurang separuh masa' } },
          { value: 1, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 0, label: { en: 'At no time', ms: 'Tidak sama sekali' } }
        ]
      },
      {
        id: 4,
        text: {
          en: 'I woke up feeling fresh and rested',
          ms: 'Saya bangun dengan berasa segar dan berehat'
        },
        options: [
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 3, label: { en: 'More than half the time', ms: 'Lebih separuh masa' } },
          { value: 2, label: { en: 'Less than half the time', ms: 'Kurang separuh masa' } },
          { value: 1, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 0, label: { en: 'At no time', ms: 'Tidak sama sekali' } }
        ]
      },
      {
        id: 5,
        text: {
          en: 'My daily life has been filled with things that interest me',
          ms: 'Kehidupan harian saya dipenuhi dengan perkara yang menarik minat saya'
        },
        options: [
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 3, label: { en: 'More than half the time', ms: 'Lebih separuh masa' } },
          { value: 2, label: { en: 'Less than half the time', ms: 'Kurang separuh masa' } },
          { value: 1, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 0, label: { en: 'At no time', ms: 'Tidak sama sekali' } }
        ]
      }
    ],
    scoring: {
      type: 'sum',
      ranges: [
        {
          min: 0,
          max: 12,
          level: 'poor',
          color: 'red',
          feedback: {
            en: 'Your wellbeing score is low. Consider reaching out to a mental health professional for support.',
            ms: 'Skor kesejahteraan anda rendah. Pertimbangkan untuk menghubungi profesional kesihatan mental untuk sokongan.'
          }
        },
        {
          min: 13,
          max: 25,
          level: 'good',
          color: 'green',
          feedback: {
            en: 'Your wellbeing score is positive. Continue with your healthy habits and self-care practices.',
            ms: 'Skor kesejahteraan anda positif. Teruskan dengan tabiat sihat dan amalan penjagaan diri anda.'
          }
        }
      ]
    }
  },
  K10: {
    id: 'K10',
    name: {
      en: 'K10: Kessler Psychological Distress Scale',
      ms: 'K10: Skala Kesusahan Psikologi Kessler'
    },
    description: {
      en: 'General Distress Screening',
      ms: 'Saringan Kesusahan Umum'
    },
    instruction: {
      en: 'These questions concern how you have been feeling over the past 4 weeks.',
      ms: 'Soalan-soalan ini berkaitan dengan perasaan anda sepanjang 4 minggu yang lalu.'
    },
    questions: [
      {
        id: 1,
        text: {
          en: 'About how often did you feel tired out for no good reason?',
          ms: 'Berapa kerap anda berasa letih tanpa sebab yang baik?'
        },
        options: [
          { value: 1, label: { en: 'None of the time', ms: 'Tidak sama sekali' } },
          { value: 2, label: { en: 'A little of the time', ms: 'Sedikit masa' } },
          { value: 3, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } }
        ]
      },
      {
        id: 2,
        text: {
          en: 'About how often did you feel nervous?',
          ms: 'Berapa kerap anda berasa gementar?'
        },
        options: [
          { value: 1, label: { en: 'None of the time', ms: 'Tidak sama sekali' } },
          { value: 2, label: { en: 'A little of the time', ms: 'Sedikit masa' } },
          { value: 3, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } }
        ]
      },
      {
        id: 3,
        text: {
          en: 'About how often did you feel so nervous that nothing could calm you down?',
          ms: 'Berapa kerap anda berasa begitu gementar sehingga tiada apa yang boleh menenangkan anda?'
        },
        options: [
          { value: 1, label: { en: 'None of the time', ms: 'Tidak sama sekali' } },
          { value: 2, label: { en: 'A little of the time', ms: 'Sedikit masa' } },
          { value: 3, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } }
        ]
      },
      {
        id: 4,
        text: {
          en: 'About how often did you feel hopeless?',
          ms: 'Berapa kerap anda berasa putus asa?'
        },
        options: [
          { value: 1, label: { en: 'None of the time', ms: 'Tidak sama sekali' } },
          { value: 2, label: { en: 'A little of the time', ms: 'Sedikit masa' } },
          { value: 3, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } }
        ]
      },
      {
        id: 5,
        text: {
          en: 'About how often did you feel restless or fidgety?',
          ms: 'Berapa kerap anda berasa gelisah atau resah?'
        },
        options: [
          { value: 1, label: { en: 'None of the time', ms: 'Tidak sama sekali' } },
          { value: 2, label: { en: 'A little of the time', ms: 'Sedikit masa' } },
          { value: 3, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } }
        ]
      },
      {
        id: 6,
        text: {
          en: 'About how often did you feel so restless you could not sit still?',
          ms: 'Berapa kerap anda berasa begitu gelisah sehingga anda tidak dapat duduk diam?'
        },
        options: [
          { value: 1, label: { en: 'None of the time', ms: 'Tidak sama sekali' } },
          { value: 2, label: { en: 'A little of the time', ms: 'Sedikit masa' } },
          { value: 3, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } }
        ]
      },
      {
        id: 7,
        text: {
          en: 'About how often did you feel depressed?',
          ms: 'Berapa kerap anda berasa murung?'
        },
        options: [
          { value: 1, label: { en: 'None of the time', ms: 'Tidak sama sekali' } },
          { value: 2, label: { en: 'A little of the time', ms: 'Sedikit masa' } },
          { value: 3, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } }
        ]
      },
      {
        id: 8,
        text: {
          en: 'About how often did you feel that everything was an effort?',
          ms: 'Berapa kerap anda rasa segala-galanya memerlukan usaha?'
        },
        options: [
          { value: 1, label: { en: 'None of the time', ms: 'Tidak sama sekali' } },
          { value: 2, label: { en: 'A little of the time', ms: 'Sedikit masa' } },
          { value: 3, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } }
        ]
      },
      {
        id: 9,
        text: {
          en: 'About how often did you feel so sad that nothing could cheer you up?',
          ms: 'Berapa kerap anda berasa begitu sedih sehingga tiada apa yang boleh menggembirakan anda?'
        },
        options: [
          { value: 1, label: { en: 'None of the time', ms: 'Tidak sama sekali' } },
          { value: 2, label: { en: 'A little of the time', ms: 'Sedikit masa' } },
          { value: 3, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } }
        ]
      },
      {
        id: 10,
        text: {
          en: 'About how often did you feel worthless?',
          ms: 'Berapa kerap anda berasa tidak bernilai?'
        },
        options: [
          { value: 1, label: { en: 'None of the time', ms: 'Tidak sama sekali' } },
          { value: 2, label: { en: 'A little of the time', ms: 'Sedikit masa' } },
          { value: 3, label: { en: 'Some of the time', ms: 'Sesetengah masa' } },
          { value: 4, label: { en: 'Most of the time', ms: 'Kebanyakan masa' } },
          { value: 5, label: { en: 'All of the time', ms: 'Sepanjang masa' } }
        ]
      }
    ],
    scoring: {
      type: 'sum',
      ranges: [
        {
          min: 10,
          max: 19,
          level: 'low',
          color: 'green',
          feedback: {
            en: 'Your distress level is low. You are likely to be well.',
            ms: 'Tahap kesusahan anda rendah. Anda mungkin sihat.'
          }
        },
        {
          min: 20,
          max: 24,
          level: 'mild',
          color: 'yellow',
          feedback: {
            en: 'Your distress level is mild. You may benefit from stress management strategies.',
            ms: 'Tahap kesusahan anda ringan. Anda mungkin mendapat manfaat daripada strategi pengurusan tekanan.'
          }
        },
        {
          min: 25,
          max: 29,
          level: 'moderate',
          color: 'orange',
          feedback: {
            en: 'Your distress level is moderate. Consider seeking support from a mental health professional.',
            ms: 'Tahap kesusahan anda sederhana. Pertimbangkan untuk mendapatkan sokongan daripada profesional kesihatan mental.'
          }
        },
        {
          min: 30,
          max: 50,
          level: 'severe',
          color: 'red',
          feedback: {
            en: 'Your distress level is high. Please seek professional help soon.',
            ms: 'Tahap kesusahan anda tinggi. Sila dapatkan bantuan profesional tidak lama lagi.'
          }
        }
      ]
    }
  }
};

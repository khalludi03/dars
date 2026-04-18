import db from './client';

db.query(`INSERT OR IGNORE INTO sections (key, emoji) VALUES
  ('Head', '🧠'),
  ('Upper', '💪'),
  ('Core', '❤️'),
  ('Lower', '🦵')
`).run();

const vocab = [
  ['head',     'رَأْسٌ',    'M', 'Head',  'رَأْسَهُ',          'raʾsahu'],
  ['hair',     'شَعْرٌ',    'M', 'Head',  'شَعْرٌ',            'shaʿrun'],
  ['face',     'وَجْهٌ',    'M', 'Head',  'وَجْهِيَ',          'wajhiya'],
  ['forehead', 'جَبِينٌ',   'M', 'Head',  'الْجَبِينِ',        'al-jabīn'],
  ['eyebrow',  'حَاجِبٌ',   'M', 'Head',  'الْحَاجِبَ',        'al-ḥājib'],
  ['nose',     'أَنْفٌ',    'M', 'Head',  'الأَنْفُ',          'al-anf'],
  ['mouth',    'فَمٌ',      'M', 'Head',  'لِلْفَمِ',          'lil-fam'],
  ['tongue',   'لِسَانٌ',   'M', 'Head',  'لِسَانَكَ',         'lisānaka'],
  ['chin',     'ذَقْنٌ',    'M', 'Head',  'بِذَقَنِ',          'bi-dhaqan'],
  ['eye',      'عَيْنٌ',    'F', 'Head',  'عَيْنَيْنِ',        'ʿaynayn'],
  ['ear',      'أُذُنٌ',    'F', 'Head',  'أُذُنَيْهِ',        'udhunayhi'],
  ['teeth',    'أَسْنَانٌ', 'F', 'Head',  'الْأَسْنَانِ',      'al-asnān'],
  ['shoulder', 'كَتِفٌ',    'M', 'Upper', 'كَتِفَ',            'katifa'],
  ['arm',      'ذِرَاعٌ',   'M', 'Upper', 'الذِّرَاعُ',        'al-dhirāʿ'],
  ['chest',    'صَدْرٌ',    'M', 'Upper', 'صَدْرَكَ',          'ṣadraka'],
  ['hand',     'يَدٌ',      'F', 'Upper', 'اليَدُ',            'al-yad'],
  ['heart',    'قَلْبٌ',    'M', 'Core',  'القَلْبُ',          'al-qalb'],
  ['stomach',  'بَطْنٌ',    'M', 'Core',  'بَطْن',             'baṭn'],
  ['thigh',    'فَخِذٌ',    'M', 'Lower', 'فَخِذَيْهِ',        'fakhidhayhi'],
  ['leg',      'رِجْلٌ',    'F', 'Lower', 'رِجْلَيْهِ',        'rijlayhi'],
  ['knee',     'رُكْبَةٌ',  'F', 'Lower', 'رُكْبَتَيْهِ',      'rukbatayhi'],
  ['shin',     'سَاقٌ',     'F', 'Lower', 'سَاقٍ',             'sāq'],
  ['foot',     'قَدَمٌ',    'F', 'Lower', 'القَدَمَيْنِ',      'al-qadamayn'],
];

const insertVocab = db.prepare(`
  INSERT OR IGNORE INTO vocabulary (key, arabic, gender, section, reference_word, reference_roman)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (const row of vocab) {
    insertVocab.run(...(row as [string, string, string, string, string, string]));
}

// Rebuild FTS index from the vocabulary content table
db.query(`INSERT INTO vocabulary_fts(vocabulary_fts) VALUES('rebuild')`).run();

console.log('Seeded sections:', db.query('SELECT COUNT(*) as n FROM sections').get());
console.log('Seeded vocabulary:', db.query('SELECT COUNT(*) as n FROM vocabulary').get());
console.log('FTS index rows:', db.query('SELECT COUNT(*) as n FROM vocabulary_fts').get());

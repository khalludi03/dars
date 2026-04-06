import type { Vocab } from "@/schemas/quiz";
import * as m from "#/paraglide/messages";

/** Static vocab data — only non-translatable fields */
const VOCAB_STATIC: Vocab[] = [
  {
    key: "head",
    ar: "رَأْسٌ",
    g: "M",
    sec: "Head",
    ref: { word: "رَأْسَهُ", roman: "raʾsahu" },
  },
  {
    key: "hair",
    ar: "شَعْرٌ",
    g: "M",
    sec: "Head",
    ref: { word: "شَعْرٌ", roman: "shaʿrun" },
  },
  {
    key: "face",
    ar: "وَجْهٌ",
    g: "M",
    sec: "Head",
    ref: { word: "وَجْهِيَ", roman: "wajhiya" },
  },
  {
    key: "forehead",
    ar: "جَبِينٌ",
    g: "M",
    sec: "Head",
    ref: { word: "الْجَبِينِ", roman: "al-jabīn" },
  },
  {
    key: "eyebrow",
    ar: "حَاجِبٌ",
    g: "M",
    sec: "Head",
    ref: { word: "الْحَاجِبَ", roman: "al-ḥājib" },
  },
  {
    key: "nose",
    ar: "أَنْفٌ",
    g: "M",
    sec: "Head",
    ref: { word: "الأَنْفُ", roman: "al-anf" },
  },
  {
    key: "mouth",
    ar: "فَمٌ",
    g: "M",
    sec: "Head",
    ref: { word: "لِلْفَمِ", roman: "lil-fam" },
  },
  {
    key: "tongue",
    ar: "لِسَانٌ",
    g: "M",
    sec: "Head",
    ref: { word: "لِسَانَكَ", roman: "lisānaka" },
  },
  {
    key: "chin",
    ar: "ذَقْنٌ",
    g: "M",
    sec: "Head",
    ref: { word: "بِذَقَنِ", roman: "bi-dhaqan" },
  },
  {
    key: "eye",
    ar: "عَيْنٌ",
    g: "F",
    sec: "Head",
    ref: { word: "عَيْنَيْنِ", roman: "ʿaynayn" },
  },
  {
    key: "ear",
    ar: "أُذُنٌ",
    g: "F",
    sec: "Head",
    ref: { word: "أُذُنَيْهِ", roman: "udhunayhi" },
  },
  {
    key: "teeth",
    ar: "أَسْنَانٌ",
    g: "F",
    sec: "Head",
    ref: { word: "الْأَسْنَانِ", roman: "al-asnān" },
  },
  {
    key: "shoulder",
    ar: "كَتِفٌ",
    g: "M",
    sec: "Upper",
    ref: { word: "كَتِفَ", roman: "katifa" },
  },
  {
    key: "arm",
    ar: "ذِرَاعٌ",
    g: "M",
    sec: "Upper",
    ref: { word: "الذِّرَاعُ", roman: "al-dhirāʿ" },
  },
  {
    key: "chest",
    ar: "صَدْرٌ",
    g: "M",
    sec: "Upper",
    ref: { word: "صَدْرَكَ", roman: "ṣadraka" },
  },
  {
    key: "hand",
    ar: "يَدٌ",
    g: "F",
    sec: "Upper",
    ref: { word: "اليَدُ", roman: "al-yad" },
  },
  {
    key: "heart",
    ar: "قَلْبٌ",
    g: "M",
    sec: "Core",
    ref: { word: "القَلْبُ", roman: "al-qalb" },
  },
  {
    key: "stomach",
    ar: "بَطْنٌ",
    g: "M",
    sec: "Core",
    ref: { word: "بَطْن", roman: "baṭn" },
  },
  {
    key: "thigh",
    ar: "فَخِذٌ",
    g: "M",
    sec: "Lower",
    ref: { word: "فَخِذَيْهِ", roman: "fakhidhayhi" },
  },
  {
    key: "leg",
    ar: "رِجْلٌ",
    g: "F",
    sec: "Lower",
    ref: { word: "رِجْلَيْهِ", roman: "rijlayhi" },
  },
  {
    key: "knee",
    ar: "رُكْبَةٌ",
    g: "F",
    sec: "Lower",
    ref: { word: "رُكْبَتَيْهِ", roman: "rukbatayhi" },
  },
  {
    key: "shin",
    ar: "سَاقٌ",
    g: "F",
    sec: "Lower",
    ref: { word: "سَاقٍ", roman: "sāq" },
  },
  {
    key: "foot",
    ar: "قَدَمٌ",
    g: "F",
    sec: "Lower",
    ref: { word: "القَدَمَيْنِ", roman: "al-qadamayn" },
  },
];

export { VOCAB_STATIC as VOCAB };

// ── Paraglide message lookups (statically referenced for tree-shaking) ──

type VocabMessages = {
  meaning: () => string;
  pr: () => string;
  refBefore: () => string;
  refAfter: () => string;
  refSrc: () => string;
};

const MSG: Record<string, VocabMessages> = {
  head: {
    meaning: m.vocab_head,
    pr: m.vocab_head_pr,
    refBefore: m.ref_head_before,
    refAfter: m.ref_head_after,
    refSrc: m.ref_head_src,
  },
  hair: {
    meaning: m.vocab_hair,
    pr: m.vocab_hair_pr,
    refBefore: m.ref_hair_before,
    refAfter: m.ref_hair_after,
    refSrc: m.ref_hair_src,
  },
  face: {
    meaning: m.vocab_face,
    pr: m.vocab_face_pr,
    refBefore: m.ref_face_before,
    refAfter: m.ref_face_after,
    refSrc: m.ref_face_src,
  },
  forehead: {
    meaning: m.vocab_forehead,
    pr: m.vocab_forehead_pr,
    refBefore: m.ref_forehead_before,
    refAfter: m.ref_forehead_after,
    refSrc: m.ref_forehead_src,
  },
  eyebrow: {
    meaning: m.vocab_eyebrow,
    pr: m.vocab_eyebrow_pr,
    refBefore: m.ref_eyebrow_before,
    refAfter: m.ref_eyebrow_after,
    refSrc: m.ref_eyebrow_src,
  },
  nose: {
    meaning: m.vocab_nose,
    pr: m.vocab_nose_pr,
    refBefore: m.ref_nose_before,
    refAfter: m.ref_nose_after,
    refSrc: m.ref_nose_src,
  },
  mouth: {
    meaning: m.vocab_mouth,
    pr: m.vocab_mouth_pr,
    refBefore: m.ref_mouth_before,
    refAfter: m.ref_mouth_after,
    refSrc: m.ref_mouth_src,
  },
  tongue: {
    meaning: m.vocab_tongue,
    pr: m.vocab_tongue_pr,
    refBefore: m.ref_tongue_before,
    refAfter: m.ref_tongue_after,
    refSrc: m.ref_tongue_src,
  },
  chin: {
    meaning: m.vocab_chin,
    pr: m.vocab_chin_pr,
    refBefore: m.ref_chin_before,
    refAfter: m.ref_chin_after,
    refSrc: m.ref_chin_src,
  },
  eye: {
    meaning: m.vocab_eye,
    pr: m.vocab_eye_pr,
    refBefore: m.ref_eye_before,
    refAfter: m.ref_eye_after,
    refSrc: m.ref_eye_src,
  },
  ear: {
    meaning: m.vocab_ear,
    pr: m.vocab_ear_pr,
    refBefore: m.ref_ear_before,
    refAfter: m.ref_ear_after,
    refSrc: m.ref_ear_src,
  },
  teeth: {
    meaning: m.vocab_teeth,
    pr: m.vocab_teeth_pr,
    refBefore: m.ref_teeth_before,
    refAfter: m.ref_teeth_after,
    refSrc: m.ref_teeth_src,
  },
  shoulder: {
    meaning: m.vocab_shoulder,
    pr: m.vocab_shoulder_pr,
    refBefore: m.ref_shoulder_before,
    refAfter: m.ref_shoulder_after,
    refSrc: m.ref_shoulder_src,
  },
  arm: {
    meaning: m.vocab_arm,
    pr: m.vocab_arm_pr,
    refBefore: m.ref_arm_before,
    refAfter: m.ref_arm_after,
    refSrc: m.ref_arm_src,
  },
  chest: {
    meaning: m.vocab_chest,
    pr: m.vocab_chest_pr,
    refBefore: m.ref_chest_before,
    refAfter: m.ref_chest_after,
    refSrc: m.ref_chest_src,
  },
  hand: {
    meaning: m.vocab_hand,
    pr: m.vocab_hand_pr,
    refBefore: m.ref_hand_before,
    refAfter: m.ref_hand_after,
    refSrc: m.ref_hand_src,
  },
  heart: {
    meaning: m.vocab_heart,
    pr: m.vocab_heart_pr,
    refBefore: m.ref_heart_before,
    refAfter: m.ref_heart_after,
    refSrc: m.ref_heart_src,
  },
  stomach: {
    meaning: m.vocab_stomach,
    pr: m.vocab_stomach_pr,
    refBefore: m.ref_stomach_before,
    refAfter: m.ref_stomach_after,
    refSrc: m.ref_stomach_src,
  },
  thigh: {
    meaning: m.vocab_thigh,
    pr: m.vocab_thigh_pr,
    refBefore: m.ref_thigh_before,
    refAfter: m.ref_thigh_after,
    refSrc: m.ref_thigh_src,
  },
  leg: {
    meaning: m.vocab_leg,
    pr: m.vocab_leg_pr,
    refBefore: m.ref_leg_before,
    refAfter: m.ref_leg_after,
    refSrc: m.ref_leg_src,
  },
  knee: {
    meaning: m.vocab_knee,
    pr: m.vocab_knee_pr,
    refBefore: m.ref_knee_before,
    refAfter: m.ref_knee_after,
    refSrc: m.ref_knee_src,
  },
  shin: {
    meaning: m.vocab_shin,
    pr: m.vocab_shin_pr,
    refBefore: m.ref_shin_before,
    refAfter: m.ref_shin_after,
    refSrc: m.ref_shin_src,
  },
  foot: {
    meaning: m.vocab_foot,
    pr: m.vocab_foot_pr,
    refBefore: m.ref_foot_before,
    refAfter: m.ref_foot_after,
    refSrc: m.ref_foot_src,
  },
};

/** Get translated meaning for a vocab word */
export function getMeaning(v: Vocab): string {
  return MSG[v.key].meaning();
}

/** Get translated transliteration for a vocab word */
export function getPronunciation(v: Vocab): string {
  return MSG[v.key].pr();
}

/** Get translated ref "before" text */
export function getRefBefore(v: Vocab): string {
  return MSG[v.key].refBefore();
}

/** Get translated ref "after" text */
export function getRefAfter(v: Vocab): string {
  return MSG[v.key].refAfter();
}

/** Get translated ref source citation */
export function getRefSrc(v: Vocab): string {
  return MSG[v.key].refSrc();
}

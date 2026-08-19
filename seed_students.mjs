/**
 * Firestore 학생 초기 데이터 입력 스크립트
 * 실행: node seed_students.mjs
 *
 * 사용법:
 * 1. npm install firebase-admin 실행
 * 2. Firebase 콘솔 → 프로젝트 설정 → 서비스 계정 → 새 비공개 키 생성
 * 3. 다운로드된 JSON 파일을 이 폴더에 serviceAccount.json으로 저장
 * 4. node seed_students.mjs 실행
 *
 * ⚠️  이미 학생이 있으면 중복 추가됩니다. 처음 한 번만 실행하세요.
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./serviceAccount.json', 'utf8'));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ───────────────────────────────────────────────────────────────
// 학생 데이터를 아래에 입력하세요.
// grade: 학년, cls: 반, name: 이름, courseId: 과목
// courseId 선택지: 'magpie'(까치) | 'tiger'(호랑이) | 'rabbit'(토끼) | 'squirrel'(다람쥐)
// ───────────────────────────────────────────────────────────────
const STUDENTS = [
  // 예시 데이터 (실제 학생으로 교체하세요)
  { grade: 3, cls: 1, name: '김민준', courseId: 'magpie',   goal: '하루에 물 6컵 마시기' },
  { grade: 3, cls: 1, name: '이서연', courseId: 'tiger',    goal: '매일 운동장 두 바퀴 뛰기' },
  { grade: 3, cls: 1, name: '박지호', courseId: 'rabbit',   goal: '하루에 줄넘기 100개 하기' },
  { grade: 3, cls: 1, name: '최수아', courseId: 'squirrel', goal: '책 15분 이상 읽기' },
  { grade: 4, cls: 1, name: '정우진', courseId: 'magpie',   goal: '아침에 스트레칭 10분 하기' },
  { grade: 4, cls: 1, name: '강하늘', courseId: 'tiger',    goal: '하루 30분 이상 운동하기' },
];

async function seed() {
  console.log(`학생 ${STUDENTS.length}명 입력 시작...`);
  const batch = db.batch();
  STUDENTS.forEach(s => {
    const ref = db.collection('students').doc();
    batch.set(ref, {
      ...s,
      points: 0,
      streak: 0,
      diaryHistory: [],
      createdAt: new Date(),
    });
  });
  await batch.commit();
  console.log('✅ 완료! Firebase 콘솔에서 확인하세요.');
  console.log('   https://console.firebase.google.com/project/yeongcheon-challenge-a97cf/firestore');
}

seed().catch(console.error);

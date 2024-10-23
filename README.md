## 지뢰찾기 게임 구현
https://minesweeeeeeper.netlify.app <br/>
(참고 : http://freeminesweeper.org/minecore.html)

## 개발 언어
`React`, `TypeScript`, `Redux`, `Redux-toolkit`, `SCSS`

## 실행 방법
1. `npm install`
2. `npm start`

## 구현 사항
![image](https://github.com/user-attachments/assets/9629fa63-9b93-46f0-8607-4bf21099a24d)
![image](https://github.com/user-attachments/assets/314fdd0e-e120-4087-b30f-2e1835b8382f)
![image](https://github.com/user-attachments/assets/aa032599-fdd9-4edb-a600-ebf798f1b4b4)
![image](https://github.com/user-attachments/assets/71c46ef3-29b5-45d8-ac86-82ae39b237fb)
![image](https://github.com/user-attachments/assets/05b5a856-6110-4ff9-a6b3-84df3bb1df2d)
![image](https://github.com/user-attachments/assets/fa05b809-4e9c-400e-85c3-355c2902126f)

- 첫 번째 빈칸을 열었을 경우에는 지뢰가 터지면 안 됨
- 게임 타이머 구현
- 오른쪽 클릭 깃발 기능
- 난이도 변경이 가능
    - Beginner (8X8) 지뢰 10개, Intermediate (16X16) 지뢰 40개, Expert (32X16) 지뢰 100개
    - Custom (가로, 세로, 지뢰 수 조정 가능)
        - 설정 가능한 가로, 세로는 최대 100 x 100이며, 지뢰수는 격자칸 수의 1/3 이하로 설정 가능
- 양쪽 클릭 기능 (Area Open)
- 렌더링 최적화
- 난이도 데이터 저장 (브라우저 새로고침 시 유지)

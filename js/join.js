window.addEventListener('load', () => {
    renderMemberlist();
});

class Member {
    constructor(userId, password, username, gender, phone, email, datetime=Date.now()){
        this.userId = userId;
        this.password = password;
        this.username = username;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.datetime = datetime;
    }
}

/**
 * submit 핸들러
 */
document.userFrm.addEventListener('submit', (e) => {
    const userId = document.getElementById("userId");
    const password = document.getElementById("password");
    const pwCheck = document.getElementById("pwCheck");
    const username = document.getElementById("username");
    const tel1 = document.getElementById("tel1");
    const tel2 = document.getElementById("tel2");
    const tel3 = document.getElementById("tel3");
    const email = document.getElementById("email");

    // 아이디 : 4 ~ 8글자, 숫자 하나이상 포함
    const regId1 = /^[a-z][a-z\d]{3,7}$/;
    const regId2 = /[0-9]/;
    if(!regExpTest(regId1, userId, 
        '아이디는 영소문자로 시작하는 4~8글자입니다.')){
        e.preventDefault();
        return;
    }
    if(!regExpTest(regId2, userId, 
        '아이디는 숫자를 하나 이상 포함해야합니다.')){
        e.preventDefault();
        return;
    }


    // 비밀번호 : 8 ~ 15자리, 숫자 하나이상, 특수문자 하나이상, 영문자
    const regPw = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[@!&]/];
    for(let i = 0; i < regPw.length; i++){
        if(!regExpTest(regPw[i], password, 
            '비밀번호는 숫자/문자/특수문자(@!&)를 포함한 8~15자리입니다.')){
                e.preventDefault();
            return;
        }
    };
    // 비밀번호 일치여부
    if(password.value !== pwCheck.value){
        alert('비밀번호가 일치하지 않습니다.');
        e.preventDefault();
        pwCheck.value = "";
        pwCheck.focus();
        return;
    }

    // 이름 : 한글 2글자 이상
    const regName = /^[가-힣]{2,}$/;
    if(!regExpTest(regName, username, 
        '이름은 한글 2글자 이상 입력하세요.')){
        e.preventDefault();
        return;
    }

    // 전화번호
    if (!regExpTest(/^0\d{1,2}$/, tel1, "번호 2자리 이상 입력")){ 
        e.preventDefault();
        return;
    }
    if (!regExpTest(/^[0-9]{3,4}$/, tel2, "번호 3자리 이상 입력")){
        e.preventDefault();
        return;
    }
    if (!regExpTest(/^[0-9]{4}$/, tel3, "4자리 번호 입력")){
        e.preventDefault();
        return;
    }

    // 이메일
    if (
        !regExpTest(
          /^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, 
          email,
          "이메일 형식에 어긋납니다."
        )
      ){       
      e.preventDefault();
        return;
      }
});

function regExpTest(regExp, el, msg){
    if(regExp.test(el.value)) return true;
    alert(msg);
    el.value = "";
    el.focus();
    return false;
}

/**
 * localStorage 저장
 */
const saveMember = () => {

    // 1. 사용자 입력값 읽어와 객체 생성
    // 전화번호
    const phone = tel1.value + tel2.value + tel3.value;
    // 성별 체크
    let genderVal;
    document.getElementsByName('gender').forEach((node) => {
        if(node.checked){
                genderVal = node.value;
        }
    });
    const member = new Member(userId.value, password.value, username.value, genderVal, phone, email.value);

    // 2. memberList 배열에 추가
    const memberList = JSON.parse(localStorage.getItem('memberList')) || [];
    memberList.push(member);

    // 3. localStorage 저장
    localStorage.setItem('memberList', JSON.stringify(memberList));

    // 4. 초기화
    document.userFrm.reset();

    // 5. 조회목록 업데이트
    renderMemberlist(memberList);
}
/**
 * unix시간 변경
 */
const datetimeFormatter = (date) => {
    const f = (n) => n >= 10? n : "0" + n;
    const MM = f(date.getMonth() + 1);
    const dd = f(date.getDate());
    const HH = f(date.getHours());
    const mm = f(date.getMinutes());

    return `${MM}/${dd} ${HH}:${mm}`;
};

/**
 * table 출력
 */
const renderMemberlist = (memberList = JSON.parse(localStorage.getItem('memberList'))) => {
    const tbody = document.querySelector("#tbl-member tbody");
    tbody.innerHTML = "";

    if(memberList){
        memberList.forEach(({userId, password, username, gender, phone, email, datetime}, index) => {
            // 비밀번호 앞 두글자 이후 *처리
            password = password.substring(0, 2) + '*****';
            
            tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${userId}</td>
                <td>${password}</td>
                <td>${username}</td>
                <td>${gender}</td>
                <td>${phone}</td>
                <td>${email}</td>
                <td>${datetimeFormatter(new Date(datetime))}</td>
            </tr>
            `;
        });
    }
    else {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">등록된 회원이 없습니다.</td></tr>';
    }
};

/**
 * 회원목록조회
 */
$("#readbtn").click(() => {
    $(".memberwrap").slideDown();
});
/**
 * 회원목록 닫기
 */
$(".close").click((e) => {
   $(e.target).parent(".memberwrap").slideUp(); 
});
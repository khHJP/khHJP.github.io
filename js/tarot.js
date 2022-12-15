// 로드시 카드 6장 순서대로 보이기
window.onload = async () => {
    const target = document.querySelector(".card");
    target.style.opacity = 1;
        await cardPromise("2");
        await cardPromise("3");
        await cardPromise("4");
        await cardPromise("5");
        await cardPromise("6");
}
// n 을 인자로 받아 nth-child opacity 변경
const cardPromise = (nth) => {
    const target = document.querySelector(`.cardwrapper :nth-child(${nth})`);
    return new Promise((resolve) => {
        setTimeout(() => {
            target.style.opacity = 1;
            resolve();
        }, 600);
    });
}


const c1 = document.querySelector(".cardwrapper :first-child");

c1.onclick = () => {
    ct1.style.opacity = 1;
    document.querySelector(".cardcontents").style.zIndex=2; 
    return cardOpen = true;
};

document.querySelector(".close").onclick = () => {
    ct1.style.opacity = 0;
    document.querySelector(".cardcontents").style.zIndex=0; 
}

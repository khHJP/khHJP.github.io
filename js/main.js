
    /**
     * jQuery ver
     */
    // $("#mainpage")
    //     .hover(
    //         (e) => {e.target.src = 'images/top_after.png';},
    //         (e) => {e.target.src = 'images/top_before.png';}
    //     )

    /**
    * js ver
    */
    mainpage.addEventListener('mouseover', (e) => {
         e.target.src = 'images/top_after.png';
    });
    mainpage.addEventListener('mouseout', (e) => {
        e.target.src = 'images/top_before.png';
    });
    
    tarot.addEventListener('mouseover', (e) => {
        e.target.src = 'images/middle_after.png';
    });
    tarot.addEventListener('mouseout', (e) => {
        e.target.src = 'images/middle_before.png';
    });

    roadmap.addEventListener('mouseover', (e) => {
        e.target.src = 'images/middle_after.png';
    });
    roadmap.addEventListener('mouseout', (e) => {
        e.target.src = 'images/middle_before.png';
    });

    about.addEventListener('mouseover', (e) => {
        e.target.src = 'images/bottom_after.png';
    });
    about.addEventListener('mouseout', (e) => {
        e.target.src = 'images/bottom_before.png';
    });
    
    join.addEventListener('mouseover', (e) => {
        e.target.src = 'images/bottom_after.png';
    });
    join.addEventListener('mouseout', (e) => {
        e.target.src = 'images/bottom_before.png';
    });
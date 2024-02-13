let image = document.querySelector('.slider-image');
      let translate = 0;  
      serInterval(() => {
        if(translate >=0 && translate<400){
          translate += 100;
        }else{
          translate = 0;
        }
        image.style.transition = '1s';
        image.style.transform =  `translateX(${-translate}%)`;
      }, 1000);
      function right(){
        if(translate<400){
          translate += 100;
          image.style.transition = '1s';
          image.style.transform =  `translateX(${-translate}%)`;
        }
      }
      function left(){
        if(translate<0){
          translate -= 100;
          image.style.transition = '1s';
          image.style.transform =  `translateX(${-translate}%)`;
        }
      }
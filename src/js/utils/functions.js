//////////////////////////////////////////////////////////////////////////////
////////////////////////// вспомогательные функции ///////////////////////////
//////////////////////////////////////////////////////////////////////////////

export function raf(fn){
    window.requestAnimationFrame(function(){
        window.requestAnimationFrame(function(){
            fn();
        });
    });
}

// для форма обратной связи
export function imOkey(n) {
  if (n != '' && n != null && n != 'undefined') {
      var numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let str = n.split('');
      var countNumber = 0;
      for(var i = 0; i < str.length; i++) {
        if (str[i] == ' ') {
          continue;
        }
          for(var j = 0; j < numbersArray.length; j++) {
              if (str[i] == numbersArray[j]) {
                  // console.log(str[i], numbersArray[j]);
                  countNumber++;
              };
          };
      };
  
      var goodOrBadValue = false;
      var badNumbers = [
          "+7 (911) 111-11-11", 
          "+7 (922) 222-22-22", 
          "+7 (933) 333-33-33",
          "+7 (944) 444-44-44",
          "+7 (955) 555-55-55",
          "+7 (966) 666-66-66",
          "+7 (977) 777-77-77",
          "+7 (988) 888-88-88",
          "+7 (999) 999-99-99"
          ];
      for( var i = 0; i < badNumbers.length; i++) {
          if (n == badNumbers[i]) {
              goodOrBadValue = true;
          };
      }; 
      
      // console.log(n, typeof n, countNumber, goodOrBadValue);
      if (countNumber == 11 && goodOrBadValue == false) {
          return true;
      } else {
          return false;
      };
  }
};

// инпут для телефона
export function makeMasks() {
    if(document.querySelectorAll(".phonemask").length > 0){
        console.log(document.querySelectorAll(".phonemask").lenght);
        let inputMask = document.querySelectorAll(".phonemask");
        Inputmask.extendDefinitions({
          'f': {"validator": "[9\(\)\.\+/ ]"}
        });
        //
        let im = new Inputmask("+7(f99)999-99-99");
        // 
        for (let i of inputMask) {
            if (typeof i != 'undefined') {
                im.mask(i);
            }
        }
    } else {
        console.log('нету масок на инпутах');
    }    
}

export function searchData(object) {
    console.log(object);
    const { containerUrl, actionName, type = null} = object;

    const container = document.querySelector(containerUrl);

    let dataString = `action=${actionName}`;
    const dataObject = {
        action: actionName,
    }

    if (type != null) {
        type.forEach(item => {
            const allElems = container.querySelectorAll(item);
            let string = '';
            allElems.forEach((j, jIndex) => {
                if (item == 'input') {
                    const i = `&${j.getAttribute('name')}=${j.value}`;
                    string += i;
                    dataObject[j.getAttribute('name')] = j.value;
                } else {
                    if (jIndex == 0) {
                        const i = j.classList.contains('active') ? `&${j.dataset.object}=${j.dataset.value}` : '';
                        string += i;
                    } else {
                        const i = j.classList.contains('active') ? `,${j.dataset.value}` : '';
                        string += i;                    
                    }
                    if (j.classList.contains('active')) {
                        dataObject[j.dataset.object] = j.dataset.value;
                    }
                }
            });
            dataString += dataString + string;
        });
    }

    console.log({
        dataString,
        dataObject,
    });
    return {
        dataString,
        dataObject,
    };
}

export function sendAjax(object) {

    const { containerUrl, formData, eventName } = object;

    const container = document.querySelector(containerUrl);

    const customEvent = new CustomEvent(eventName, {bubbles: true});
    container.dispatchEvent(customEvent);

    fetch(
        window.wp.ajax_url, // '/wp-admin/admin-ajax.php', // точка входа
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // отправляемые данные 
            },
            body: formData
        }
    )
    .then(
        response => {
            console.log('Сообщение отправлено методом fetch')
            return response.json()
        }
    )
    .then(
        response => {
            const successEvent = new CustomEvent(`${eventName}_success`, {
                bubbles: true,
                detail: {
                    data: response,
                },
            });
            container.dispatchEvent(successEvent);
        }
    )
    .catch(
        error => {
            console.error(error);

            const errorEvent = new CustomEvent(`${eventName}_error`, {bubbles: true});
            container.dispatchEvent(errorEvent);
        }
    )


}

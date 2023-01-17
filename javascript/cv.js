const inner = document.querySelectorAll('.inner');
const random1= document.querySelector(".random1")
	function randomcolor() {
		return Math.floor(Math.random() * 255);
	}
	random1.addEventListener('click', () => {
        
            const a= randomcolor()
            const b= randomcolor()
            const c= randomcolor()
            for(let i=0;i<=inner.length;i++){
            inner[i].style.color = 'rgba('+a+','+b+','+c+')';
            }
        })
        const random2= document.querySelector(".random2")
	function randomcolor() {
		return Math.floor(Math.random() * 255);
	}
	random2.addEventListener('click', () => {
        
            const a= randomcolor()
            const b= randomcolor()
            const c= randomcolor()
            for(let i=0;i<=inner.length;i++){
            inner[i].style.color = 'rgba('+a+','+b+','+c+')';
            }
        })
        

	

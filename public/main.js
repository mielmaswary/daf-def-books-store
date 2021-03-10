//elements
const recommendedsContainer =document.querySelector('#recommendeds')
const salesContainer =document.querySelector('#sales')
const newBooksContainer =document.querySelector('#new-books')
const footer=document.querySelector('#footer')
const footerDafdef=footer.getElementsByClassName('footer-daf-def')[0]
const footerGenres=footer.getElementsByClassName('footer-genres')[0]
const footerSales=footer.getElementsByClassName('footer-sales')[0]
const login=footerDafdef.children[1]

const modalBackground=document.getElementsByClassName('modal')[0]
const signupForm=modalBackground.children[0]
const loginForm=modalBackground.children[1]

const switchToSignUpBtn=document.querySelector('#switch-to-signup')
const switchToLoginBtn=document.querySelector('#switch-to-login')




//requires


const url='http://localhost:3000/books/get'
const renderImages=(url)=>{
    fetch(url).then((res)=>{
        if(res.ok){
           return res.json()
        }
        else{
            throw new Error(res.status)
        }
    }).then((jsonObj)=>{
       const recommendedsBooksUrl=jsonObj.filter(img=>img.recommended).map(img=>img.imageUrl)
       const recommendedsBooks=recommendedsContainer.getElementsByClassName('gallery-cell')

       const salesBooksUrl=jsonObj.filter(img=>img.sale).map(img=>img.imageUrl)
       const salesBooks=salesContainer.getElementsByClassName('gallery-cell')

       const newBooksUrl=jsonObj.filter(img=>img.new).map(img=>img.imageUrl)
       const newBooks=newBooksContainer.getElementsByClassName('gallery-cell')


       for(let i=0;i<recommendedsBooks.length;i++){
           recommendedsBooks[i].style.backgroundImage=`url(${recommendedsBooksUrl[i]})`
           salesBooks[i].style.backgroundImage=`url(${salesBooksUrl[i]})`
           newBooks[i].style.backgroundImage=`url(${newBooksUrl[i]})`
       }
    
    })
    
}

const closeModal=()=>{
    closeLoginModal()
    closeSignupModal()
}
const openLoginModal=()=>{
    modalBackground.classList.remove('display-none')
    // loginForm.style.transform='translateX(300px)'
    loginForm.classList.remove('display-none')
}

const closeLoginModal=()=>{
    modalBackground.classList.add('display-none')

    loginForm.classList.add('display-none')
}

const openSignupModal=()=>{
    modalBackground.classList.remove('display-none')

    signupForm.classList.remove('display-none')
   
}
const closeSignupModal=()=>{
    modalBackground.classList.add('display-none')
    signupForm.classList.add('display-none')
   
}

const openLoginForm=()=>{
    // loginForm.style.transform='translateX(250px)'
    loginForm.classList.remove('display-none')
}
const closeLoginForm=()=>{
    loginForm.classList.add('display-none')
}
const openSignupForm=()=>{
    signupForm.classList.remove('display-none')
}
const closeSignupForm=()=>{
    signupForm.classList.add('display-none')

}

const swichToLogin=()=>{
    openLoginForm()
    closeSignupForm()
}
const swichToSignup=()=>{
    openSignupForm()
    closeLoginForm()
}

switchToSignUpBtn.addEventListener('click', swichToSignup)
switchToLoginBtn.addEventListener('click',swichToLogin)




login.addEventListener('click',openLoginModal)
window.onclick = (event)=> {
    if (event.target===modalBackground|| event.target.className==="fas fa-times")
        closeModal()
  }





const signUpUser=(userData)=>{
    alert('Sign up')
    const data=userData

   fetch('http://localhost:3000/users/add', {
       method: 'POST', 
       headers: {
          'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
       })
       .then((res)=>
          console.log(res))
}

const logout=()=>{

}


renderImages(url)

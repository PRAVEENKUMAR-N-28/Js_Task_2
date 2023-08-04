const btnCart=document.querySelector('#cart-icone');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('.cart-close');

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active')
})

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
})

document.addEventListener('DOMContentLoaded',loaditem);

function loaditem(){
    loadContent();

}

function loadContent(){
    //Remove item from the cart
    let btnRemove=document.querySelectorAll('.cart-remove')
    btnRemove.forEach( (btn)=>{
        btn.addEventListener('click',removeItem)
    })

    //item quantity
    let qtyElement=document.querySelectorAll('.cart-quantity')
    qtyElement.forEach( (input)=>{
        input.addEventListener('change',changeQty)
    })

    //product cart
    let cartBtns=document.querySelectorAll('.cart1')
    cartBtns.forEach( (btn)=>{
        btn.addEventListener('click',addCart)
    })
    
    updateTotal()
    
    //buy button
    document.getElementsByClassName('btn-buy')[0]
    .addEventListener('click',buyButtonCliked);

}

//buy
function buyButtonCliked(){
    alert("Your Order is Placed")
    let cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal()
    
}


//remove
function removeItem(){
    if(confirm('Are You Sure to Remove')){
        let title=this.parentElement.querySelector('.cart-item-title').innerHTML;
        itemList=itemList.filter(el=>el.title!=title);
        loadContent()
    this.parentElement.remove();
    }
}


//quantity

function changeQty(){
    if(isNaN(this.value)|| this.value<1){
        this.value=1;
    }
    loadContent()
}

let itemList=[]

//add cart
function addCart(){
    let air=this.parentElement;
    let title=air.querySelector('.air-title').innerHTML;
    let price=air.querySelector('.air-price').innerHTML;
    let imgSrc=air.querySelector('.pro').src;
   
    let newProduct={title,price,imgSrc}
    //check product already in cart

    if(itemList.find((el)=>el.title==newProduct.title))
    {
        alert("Product Already Added in Cart");
        return;
    }else{
        itemList.push(newProduct);
    }


    let newProductElement= createCartProduct(title,price,imgSrc);
    let element=document.createElement('div');
    element.innerHTML=newProductElement;
    let cartItem=document.querySelector('.cart-content');
    cartItem.append(element);
    loadContent();
    
}





function createCartProduct(title,price,imgSrc){

    return `
    <div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="detail-box">
        <div class="cart-item-title">${title}</div>
        <div class="price-box">
            <div class="cart-price">${price} </div>
            <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;" class="cart-remove"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
</div>
              `;
}


function updateTotal(){

    const cartItems=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');

    let total=0;

    cartItems.forEach(product=>{
      let priceElement=product.querySelector('.cart-price');
      let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
      let qty=product.querySelector('.cart-quantity').value;
      total+=(price*qty);
      product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
  
    });
  
    totalValue.innerHTML='Rs.'+total;
    
}



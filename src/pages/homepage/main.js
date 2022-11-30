import { getAllProducts } from '../../lib/firebase-firestore.js';

export default () => {
  const container = document.createElement('div');

  const templateProducts = `
      <body>
        <div class="wrapper">
            <header>
              <nav class='nav-bar-homepage'>
                  <div class="div-menu">
                      <button id="btnMenu" class="btn-menu"><img src="assets/menu.png"</button>
                  </div>
                  <img class='img-logo-nav' src='assets/logo-citi.png' alt='Logo do CitiBank, com a palavra Citi escrito em letras brancas e 
                          um arco vermelho em cima da palavra'>
                  <div>
                      <a href='#login' class='btn-login'><img src='assets/login.png' alt='Botão branco de redirecionamento à página de login'></a>
                      <a href='#cart' class='btn-cart'><img src='assets/carrinho.png' alt='Botão branco de redirecionamento ao carrinho'></a>
                  </div>
              </nav>
            </section>
       
            <section id='cards-products' class='cards-products'>
         
            </section>
          </main>

          <footer class='footer-homepage'>
          <div class='footer-logo-links'>
            <img src='assets/logo-citi.png' alt='Logo do CitiBank, com a palavra Citi escrito em letras brancas e um arco vermelho em cima da palavra'>
            <a href='#developers'>Desenvolvedoras</a>
            <a href='https://corporateportal.brazil.citibank.com/quem-somos.htm' target='_blank'>Sobre o Cit</a>
          </div>
          <div class='footer-copyright'>
            <p>© 2022 Citigroup Inc. Todos os direitos reservados.</p>
          </div>
          </footer>
      </body>


`;
  container.innerHTML = templateProducts;

  const menuProducts = Array.from(container.querySelectorAll('.tag-products'));
  const menu = container.querySelector('#btnMenu');

  // const productCard = Array.from(container.querySelectorAll('#product-card'));

  // productCard.forEach((card) => {
  //   card.addEventListener('click', (el) => {
  //     toggle(el.currentTarget.dataset.productId);
  //     console.log(el.currentTarget.dataset.productId);
  //   });
  // });

  menu.addEventListener('click', () => {
    const navFilter = container.querySelector('#navFilter');
    navFilter.classList.toggle('active');
  });

  const printProducts = async (category) => {
    let productsArr = await getAllProducts();

    if (category !== 'allProducts') {
      productsArr = productsArr.filter((product) => product.categoria.includes(category));
    }

    const productsTemplate = productsArr.map((product) => `
      <div id="product-card" class="product-card" data-product-id=${product.id}>
        <img id="img-card" src='${product.img}'></img>
        <ul>
          <li>${product.nome}</li>
          <li>R$ ${product.preco}</li>
        </ul>
        <button data-product-id=${product.SKU} id='open-modal' class="btn-modal">Ver mais</button>
        <div id="fade" class="none"></div>
  
        <div id='modal-product' class='none'>
          <button id='close-modal'>X</button>
          <img class='img-modal-product' src='${product.img}'></img>
          <ul>
            <li class='modal-name-product'>${product.nome}</li>
            <li class='modal-description-product'>${product.descricao}</li>
            <li class='modal-price-product'>R$ ${product.preco}</li>
          </ul>
          <button id='buy-product'>Comprar</button>
        </div>
      </div>
    `).join('');

    container.querySelector('#cards-products').innerHTML = productsTemplate;

    const openModal = Array.from(container.querySelectorAll('.btn-modal'));
    const closeModal = container.querySelector('#close-modal');
    const modal = container.querySelector('#modal-product');
    // const buyBtn = container.querySelector('#buy-product');
    const fade = container.querySelector('#fade');

    function toggle(id) {
      modal.classList.toggle('none');
      modal.setAttribute('data-idPost', id);
      fade.classList.toggle('none');
    }

    openModal.forEach((btn) => {
      btn.addEventListener('click', (el) => {
        toggle(el.currentTarget.dataset.productId);
        console.log(el.currentTarget.dataset.productId);
      });
    });

    [fade, closeModal].forEach((el) => {
      el.addEventListener('click', () => {
        toggle();
      });
    });

    menuProducts.forEach((prod) => {
      prod.addEventListener('click', () => {
        printProducts(prod.dataset.product);
      });
    });
  };

  printProducts('allProducts');

  return container;
};

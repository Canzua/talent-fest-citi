import { getAllProducts } from '../../lib/firebase-firestore.js';

export default () => {
  const container = document.createElement('div');

  const templateProducts = `
      <body>
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
          </header>
          
          <main>
            <nav class='nav-filter-homepage' id='navFilter'>
                <ul id='menu' class='menu'>
                    <li data-product='allProducts' class='list-allproducts tag-products'>Todos os Produtos</li>
                    <li data-product='mouse' class='tag-products'>Mouse</li>
                    <li data-product='keyboard' class='tag-products'>Teclado</li>
                    <li data-product='headset' class='tag-products'>Headset</li>
                    <li data-product='webcam' class='tag-products'>Webcam</li>
                    <li data-product='mousepad' class='tag-products'>Mousepad</li>
                </ul> 
            </nav>
       
              <div id='cards-products' class='cards-products'>
              </div>
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

  const menuProducts = Array.from(container.querySelectorAll('.tag-products'));

  container.innerHTML = templateProducts;

  const menu = container.querySelector('#btnMenu')

  menu.addEventListener('click', () => {
    const navFilter = container.querySelector('#navFilter')
    navFilter.classList.toggle('active');
  });

  const printProducts = async (category) => {
    let productsArr = await getAllProducts();

    if (category !== 'allProducts') {
      productsArr = productsArr.filter((product) => product.categoria.includes(category));
    }

    const productsTemplate = productsArr.map((product) => `
      <div id="product-card" class="product-card">
        <img src='${product.img}'></img>
        <ul>
          <li>${product.nome}</li>
          <li>R$ ${product.preco}</li>
        </ul>
      </div>
    `).join('');

    container.querySelector('#cards-products').innerHTML = productsTemplate;

    menuProducts.forEach((prod) => {
      prod.addEventListener('click', () => {
        printProducts(prod.dataset.product);
      });
    });
  };

  printProducts('allProducts');

  return container;
};

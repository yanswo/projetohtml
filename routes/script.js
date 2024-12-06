function gerarDadosSimulados(servico) {
  let servicos = {
    odonto: {
      estrelas: 4,
      doutores: 8,
      planosAceitos: ["Bradesco", "Amil", "Unimed", "Hapvida"],
      localizacao: "Rua das Flores, 123 - Centro",
      medicos: ["Dr. João Silva", "Dra. Maria Oliveira"],
    },
    psicologia: {
      estrelas: 5,
      doutores: 3,
      planosAceitos: ["Bradesco", "SulAmérica"],
      localizacao: "Avenida São Paulo, 456 - Bairro das Águas",
      medicos: ["Dr. Marcos Pereira", "Dra. Luana Lima", "Dr. Felipe Rocha"],
    },
    dermatologia: {
      estrelas: 4,
      doutores: 6,
      planosAceitos: ["Unimed", "Bradesco", "Amil"],
      localizacao: "Avenida Principal, 789 - Zona Norte",
      medicos: ["Dr. Carlos Alves", "Dra. Beatriz Almeida", "Dr. Igor Ribeiro"],
    },
  };

  return servicos[servico] || null;
}

function buscarServicos() {
  let input = document
    .getElementById("search-input-header")
    .value.toLowerCase()
    .trim();
  let resultadosDiv = document.getElementById("resultados");

  resultadosDiv.innerHTML = "";

  if (input) {
    let dados = gerarDadosSimulados(input);

    if (dados) {
      let cardHTML = `
        <div class="card" onclick="abrirModal('${input}')">
          <h3>${input.charAt(0).toUpperCase() + input.slice(1)}</h3>
          <p><strong>Estrelas:</strong> ${"★".repeat(
            dados.estrelas
          )}${"☆".repeat(5 - dados.estrelas)}</p>
          <p><strong>Doutores:</strong> ${dados.doutores}</p>
          <p><strong>Localização:</strong> ${dados.localizacao}</p>
        </div>
      `;
      resultadosDiv.innerHTML = cardHTML;
    } else {
      resultadosDiv.innerHTML = `<p>Desculpe, não encontramos resultados para "${input}".</p>`;
    }
  } else {
    resultadosDiv.innerHTML =
      "<p>Por favor, digite um serviço para buscar.</p>";
  }
}

function abrirModal(servico) {
  let dados = gerarDadosSimulados(servico);

  if (dados) {
    const imagensClinica = {
      odonto: ["/img/odonto1.jpg", "/img/odonto2.jpg", "/img/odonto3.jpg"],
      psicologia: ["/img/psico1.jpg", "/img/psico2.jpg", "/img/psico3.jpg"],
      dermatologia: ["/img/derma1.jpg", "/img/derma2.jpg", "/img/derma3.jpg"],
    };

    let imagens = imagensClinica[servico] || [];

    let carrosselHTML = `
      <div class="carousel">
        <button class="prev-btn" onclick="mudarSlide(-1)">&#10094;</button>
        <div class="carousel-images">
          ${imagens
            .map(
              (img, index) => `
              <img class="carousel-slide ${
                index === 0 ? "active" : ""
              }" src="${img}" alt="Imagem ${index + 1} da clínica ${
                servico.charAt(0).toUpperCase() + servico.slice(1)
              }" />
            `
            )
            .join("")}
        </div>
        <button class="next-btn" onclick="mudarSlide(1)">&#10095;</button>
      </div>
    `;

    let medicosHTML = dados.medicos
      .map((medico) => `<li>${medico}</li>`)
      .join("");

    let mapaBotaoHTML = `
      <button onclick="abrirMapa('${dados.localizacao}')">Ver no Mapa</button>
    `;

    document.getElementById("modal-title").textContent = `Detalhes de ${
      servico.charAt(0).toUpperCase() + servico.slice(1)
    }`;
    document.getElementById("modal-content").innerHTML = `
      ${carrosselHTML}
      <p><strong>Estrelas:</strong> ${"★".repeat(dados.estrelas)}${"☆".repeat(
      5 - dados.estrelas
    )}</p>
      <p><strong>Doutores:</strong> ${dados.doutores}</p>
      <p><strong>Planos Aceitos:</strong> ${dados.planosAceitos.join(", ")}</p>
      <p><strong>Localização:</strong> ${dados.localizacao}</p>

      <!-- Botão de Mapa -->
      ${mapaBotaoHTML}

      <!-- Lista de Médicos -->
      <h4>Equipe de Médicos:</h4>
      <ul>${medicosHTML}</ul>
      
      <!-- Formulário de Contato -->
      <div class="contact-form">
        <h3>Entre em Contato</h3>
        <form id="contactForm">
          <input type="text" id="contact-name" placeholder="Seu Nome" required />
          <input type="email" id="contact-email" placeholder="Seu E-mail" required />
          <textarea id="contact-message" placeholder="Sua Mensagem" required></textarea>
          <button type="submit">Enviar Mensagem</button>
        </form>
      </div>
      
      <!-- Botão WhatsApp -->
      <div class="whatsapp-button">
        <a href="https://wa.me/55xxxxxxxxxxx" target="_blank">
          <button>Entrar em Contato via WhatsApp</button>
        </a>
      </div>
    `;

    document.getElementById("modal").classList.add("show");

    document
      .getElementById("contactForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        let nome = document.getElementById("contact-name").value;
        let email = document.getElementById("contact-email").value;
        let mensagem = document.getElementById("contact-message").value;

        alert(
          `Mensagem enviada! Nome: ${nome}, E-mail: ${email}, Mensagem: ${mensagem}`
        );

        document.getElementById("contactForm").reset();
      });
  }
}

function abrirMapa(localizacao) {
  const endereco = encodeURIComponent(localizacao);
  const url = `https://www.google.com/maps?q=${endereco}`;
  window.open(url, "_blank");
}

let currentSlide = 0;

function mudarSlide(n) {
  const slides = document.querySelectorAll(".carousel-slide");
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function fecharModal() {
  document.getElementById("modal").classList.remove("show");
}

document
  .getElementById("search-button-header")
  .addEventListener("click", buscarServicos);

document
  .getElementById("btn-close-modal")
  .addEventListener("click", fecharModal);

function abrirModalIntegrantes() {
  var modal = document.getElementById("modal-integrantes");
  modal.classList.remove("hidden");
  modal.classList.add("show");
}

function fecharModalIntegrantes() {
  var modal = document.getElementById("modal-integrantes");
  modal.classList.remove("show");
}

function toggleMenu() {
  document.getElementById("authPanel").classList.toggle("show");
}

function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("cadastroForm").style.display = "none";
}

function showCadastro() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("cadastroForm").style.display = "block";
}

function cadastrarUsuario() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (localStorage.getItem(email)) {
    alert("Este e-mail já está cadastrado.");
    return;
  }

  const usuario = { nome, email, senha };
  localStorage.setItem(email, JSON.stringify(usuario));

  alert("Cadastro realizado com sucesso!");
  toggleMenu();
}

function loginUsuario() {
  const email = document.getElementById("email-login").value;
  const senha = document.getElementById("senha-login").value;

  const usuario = JSON.parse(localStorage.getItem(email));
  if (usuario && usuario.senha === senha) {
    alert("Login realizado com sucesso!");
    toggleMenu();
  } else {
    alert("E-mail ou senha inválidos.");
  }
}

document
  .querySelector('a[href="#team"]')
  .addEventListener("click", function (event) {
    event.preventDefault();
    abrirModalIntegrantes();
  });

document
  .getElementById("btn-close-integrantes")
  .addEventListener("click", fecharModalIntegrantes);

window.addEventListener("click", function (event) {
  var modal = document.getElementById("modal-integrantes");
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

document.getElementById("menu-button").addEventListener("click", toggleMenu);

document.getElementById("menu-btn").addEventListener("click", function () {
  document.getElementById("authPanel").classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
  const typedText = document.getElementById("typed-text");
  const text = typedText.textContent;
  typedText.textContent = "";

  let index = 0;
  function typeText() {
    if (index < text.length) {
      typedText.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 80);
    }
  }
  typeText();
});

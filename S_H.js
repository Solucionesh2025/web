  function publicarAviso() {
    
    const titulo = document.getElementById('tituloPuesto').value;
    const descripcion = document.getElementById('descripcionPuesto').value;
    const requisitos = document.getElementById('requisitos').value;
    const tipoContrato = document.getElementById('tipoContrato').value;
    const salarioMin = document.getElementById('salarioMinimo').value;
    const salarioMax = document.getElementById('salarioMaximo').value;
    const region = document.getElementById('region').value;
    const ciudad = document.getElementById('ciudad').value;
    const direccion = document.getElementById('direccion').value;
    const empresa = document.getElementById('nombreEmpresa').value;
    const expiracion = document.getElementById('fechaExpiracion').value;
    const celular = document.getElementById('celular').value;
    const logoFile = document.getElementById('logoEmpresa').files[0];

    if (!logoFile) {
      alert("⚠️ Por favor, sube el logo de la empresa.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const logoURL = e.target.result;

      const avisoHTML = `
        <div class="WEN">
          <h2>${titulo}</h2>
          <center>
          <img src="${logoURL}" alt="Logo de la empresa" style="max-width: 100px; max-height: 100px; display:block; margin-bottom:10px;">
          <p><strong>${empresa}</strong></p>
          <p>${descripcion}</p>
          <p><strong>Requisitos:</strong> ${requisitos}</p>
          <p><strong>Contrato:</strong> ${tipoContrato}</p>
          <p><strong>Salario:</strong> S/.${salarioMin} - S/.${salarioMax}</p>
          <p><strong>Ubicación:</strong> ${region}, ${ciudad}, ${direccion}</p>
          <p><strong>Celular:</strong> ${celular}</p>
          <p><strong>Expira:</strong> ${expiracion}</p>
          <a href="https://wa.me/51${celular}" target="_blank" class="btn btn-success">
            Contactar por WhatsApp
          </a>
        </div>
      `;

      document.getElementById('jobsContainer').innerHTML += avisoHTML;

      // Limpiar campos del formulario
      document.querySelectorAll('input, textarea, select').forEach(e => e.value = '');

      // Mostrar alerta de éxito
      alert("✅ ¡El aviso ha sido publicado exitosamente!");
    };

    reader.readAsDataURL(logoFile);
  }
  // Mostrar formulario----------------------------------------------
    
    

   const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('activo');
  });



  document.addEventListener('DOMContentLoaded', function () {
  const publicacionesGuardadas = JSON.parse(localStorage.getItem('publicaciones')) || [];
  const publicacionesContainer = document.querySelector('.destacados-cards');

  const tipoMapeado = {
    completo: "Tiempo completo",
    medio: "Medio tiempo",
    freelance: "Freelance",
    practicas: "Prácticas"
  };

  publicacionesGuardadas.forEach(publicacion => {
    const card = document.createElement('div');
    card.classList.add('destacado-card');

    const tipoTexto = tipoMapeado[publicacion.tipo] || publicacion.tipo;

    card.innerHTML = `
      <div class="container-card">
        <div class="card-content">
          <h3>${publicacion.titulo}</h3>
          <p>${publicacion.empresa}</p>
          <p> S/.<strong>${publicacion.salario}</strong></p>
          <p>${tipoTexto}</p>
        </div>
        <div class="pequecard">
          <img src="${publicacion.imagen}" alt="Imagen de la empresa" />
        </div>
      </div>
      <div class="card-bottom">
        <p>${publicacion.descripcion}</p>
        <button class="apply-btn">Postular</button>
        <button class="details-btn">Ver detalles</button>
      </div>
    `;

    const botonDetalles = card.querySelector('.details-btn');
    botonDetalles.addEventListener('click', () => {
      document.getElementById('modal-titulo').textContent = publicacion.titulo;
      document.getElementById('modal-empresa').textContent = publicacion.empresa;
      document.getElementById('modal-salario').textContent = publicacion.salario;
      document.getElementById('modal-jornada').textContent = tipoTexto;
      document.getElementById('modal-ubicacion').textContent = publicacion.ubicacion || 'No especificada';
      document.getElementById('modal-requisitos').textContent = publicacion.requisitos || 'No especificados';
      document.getElementById('modal-contacto').textContent = publicacion.contacto || 'No disponible';
      document.getElementById('modal-descripcion').textContent = publicacion.descripcion;

      document.getElementById('modal-detalles').style.display = 'flex';
    });

    publicacionesContainer.appendChild(card);
  });

  document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('modal-detalles').style.display = 'none';
  });

  document.getElementById('modal-detalles').addEventListener('click', (e) => {
    if (e.target.id === 'modal-detalles') {
      e.currentTarget.style.display = 'none';
    }
  });

  const botonLogin = document.querySelector('.contact-button');
  if (botonLogin) {
    botonLogin.addEventListener('click', () => {
      const clave = prompt("🔒 Ingresa tu clave para iniciar sesión:");
      if (clave === "admin123") {
        window.location.href = "paneladmin.html";
      } else {
        alert("⚠️ Acceso denegado. Solo administradores.");
      }
    });
  }

  const logosContainer = document.querySelector(".logos");
  if (logosContainer) {
    const logos = Array.from(logosContainer.children);
    logos.forEach(logo => {
      logosContainer.appendChild(logo.cloneNode(true));
    });
  }

  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = btn.closest('.destacado-card');
      const puesto = card.querySelector('h3').textContent;

      const index = Array.from(document.querySelectorAll('.destacado-card')).indexOf(card);
      const publicacion = publicacionesGuardadas[index];

      document.getElementById('puesto-postulacion').textContent = puesto;
      document.getElementById('puesto-input').value = puesto;
      document.getElementById('contacto-input').value = publicacion.contacto || '';

      document.getElementById('modal-postulacion').style.display = 'flex';
    });
  });

  document.querySelector('.close-modal-postulacion').addEventListener('click', () => {
    document.getElementById('modal-postulacion').style.display = 'none';
  });

  document.getElementById('form-postulacion').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = this.nombre.value;
    const correo = this.correo.value;
    const telefono = this.telefono.value;
    const mensaje = this.mensaje.value;
    const puesto = this.puesto.value;
    const numeroContacto = this.contacto.value;

    if (!numeroContacto) {
      alert("❌ No se pudo obtener el número de WhatsApp del empleador.");
      return;
    }

    this.reset();
    document.getElementById('modal-postulacion').style.display = 'none';
  });
});
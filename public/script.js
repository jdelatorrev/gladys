async function buscar() {
    const query = document.getElementById('busqueda').value;
    const response = await fetch(`/api/productos?busqueda=${encodeURIComponent(query)}`);
    const productos = await response.json();
  
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
  
    productos.forEach(p => {
      resultado.innerHTML += `
        <tr>
          <td>${p.id}</td>
          <td>${p.descripcion}</td>
          <td>${p.color}</td>
          <td>$${p.precio}</td>
        </tr>`;
    });
  }
// Cargar todos los productos al iniciar
window.onload = () => {
    cargarTodos();
  };
  
  async function cargarTodos() {
    const response = await fetch(`/api/productos?busqueda=`);
    const productos = await response.json();
    mostrarProductos(productos);
  }
  
  async function buscar() {
    const query = document.getElementById('busqueda').value.trim();
    const estado = document.getElementById('estadoFiltro').value;
  
    let url = `/api/productos?busqueda=${encodeURIComponent(query)}&estado=${encodeURIComponent(estado)}`;
  
    const response = await fetch(url);
    const productos = await response.json();
    mostrarProductos(productos);
  }
  
  
  function mostrarProductos(productos) {
    console.log("Productos recibidos:", productos); // <-- Verifica si cada producto tiene "estado"
  
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
  
    if (productos.length === 0) {
      resultado.innerHTML = '<tr><td colspan="5">No se encontraron productos</td></tr>';
      return;
    }
  
    productos.forEach(p => {
      resultado.innerHTML += `
        <tr>
          <td>${p.id}</td>
          <td>${p.descripcion}</td>
          <td>${p.color}</td>
          <td>$${p.precio}</td>
          <td>${p.estado || 'desconocido'}</td>
          <td>${p.cliente || ''}</td>
          <td>
            ${p.estado === 'disponible' 
              ? `<button onclick="marcarVendido(${p.id})">Vender</button>` 
              : `<button onclick="marcarDisponible(${p.id})">Disponible</button>`}
          </td>
        </tr>`;
    });
  }

  function mostrarProductos(productos) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
  
    if (productos.length === 0) {
      resultado.innerHTML = '<tr><td colspan="7">No se encontraron productos</td></tr>';
      return;
    }
  
    productos.forEach(p => {
      resultado.innerHTML += `
        <tr>
          <td>${p.id}</td>
          <td>${p.descripcion}</td>
          <td>${p.color}</td>
          <td>$${p.costo}</td>
          <td>$${p.precio_final}</td>
          <td>${p.estado || 'desconocido'}</td>
          <td>${p.cliente || ''}</td>
          <td>
            ${p.estado === 'disponible' 
              ? `<button onclick="marcarVendido(${p.id})">Vender</button>` 
              : `<button onclick="marcarDisponible(${p.id})">Disponible</button>`}
          </td>
        </tr>`;
    });
  }
  

  async function marcarVendido(id) {
    const { value: cliente } = await Swal.fire({
      title: '¿A quién se le vendió?',
      input: 'text',
      inputLabel: 'Nombre del cliente',
      inputPlaceholder: 'Escribe el nombre',
      showCancelButton: true,
      confirmButtonText: 'Vender',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return '¡Tienes que escribir un nombre!';
        }
      }
    });
  
    if (cliente) {
      await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'vendido', cliente })
      });
  
      await Swal.fire({
        icon: 'success',
        title: '¡Producto vendido!',
        text: `Vendido a ${cliente}`,
        showConfirmButton: false,
        timer: 2000
      });
  
      buscar(); // Actualiza la lista
    }
  }
  
  
  
  async function marcarDisponible(id) {
    const confirmacion = await Swal.fire({
      title: '¿Marcar como disponible?',
      text: "Este producto volverá a estar disponible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5c9ded',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, marcar disponible',
      cancelButtonText: 'Cancelar'
    });
  
    if (confirmacion.isConfirmed) {
      await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'disponible', cliente: '' })
      });
  
      await Swal.fire({
        icon: 'success',
        title: '¡Producto disponible!',
        showConfirmButton: false,
        timer: 2000
      });
  
      buscar(); // Actualiza la lista
    }
  }
  
  
  
  
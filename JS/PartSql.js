// Registrar usuario
document.getElementById("SignInButton").addEventListener("click", () => {
    const idCliente = document.getElementById("idClientes").value;
    const Nombre = document.getElementById("nombre").value;
    const Correo = document.getElementById("correo").value;
    const Telefono = document.getElementById("telefono").value;
    const FechaRegistro = document.getElementById("fechaRegistro").value;


    if (!idCliente || !Nombre || !Correo || !Telefono || !FechaRegistro) {
        alert("All fields are required.");
        return;
    }

    const data = {
        idCliente : idCliente ,
        Nombre: Nombre,
        Correo: Correo,
        Telefono: Telefono,
        FechaRegistro: FechaRegistro
    };

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Registration failed.");
            }
        })
        .then(message => {
            alert(message);
            document.getElementById("nombre").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("telefono").value = "";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while registering.");
        });
});
const jadwalBody = document.getElementById("jadwalBody");

function renderJadwal() {
    const bookings = JSON.parse(localStorage.getItem("campusBookings")) || [];
    jadwalBody.innerHTML = "";

    if (bookings.length === 0) {
        jadwalBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    Tidak ada jadwal booking
                </td>
            </tr>
        `;
        return;
    }

    bookings.forEach((b, index) => {
        jadwalBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${b.room}</td>
                <td>${b.course}</td>
                <td>${b.time}</td>
                <td>${b.date}</td>
                <td>
                    <button class="btn-delete" onclick="hapusBooking(${b.id})">
                        ❌ Batal
                    </button>
                </td>
            </tr>
        `;
    });
}

// Fungsi hapus booking
function hapusBooking(id) {
    if (!confirm("Yakin ingin membatalkan booking ini?")) return;

    let bookings = JSON.parse(localStorage.getItem("campusBookings")) || [];
    bookings = bookings.filter(b => b.id !== id);

    localStorage.setItem("campusBookings", JSON.stringify(bookings));
    renderJadwal();
}

// Render awal
renderJadwal();

/* ================================
   ELEMENT
================================ */
const container = document.getElementById("ruangan-container");
const floorButtons = document.querySelectorAll(".floor-btn");

const modal = document.getElementById("bookingModal");
const modalTitle = document.getElementById("modalTitle");
const bookingForm = document.getElementById("bookingForm");
const closeBtn = document.querySelector(".close-btn");

/* ================================
   STATE
================================ */
let currentFloor = "3";

/* ================================
   RENDER RUANGAN
================================ */
function renderRuangan() {
    container.innerHTML = "";

    // Jika lantai bukan 3 → Coming Soon
    if (currentFloor !== "3") {
        container.innerHTML = `
            <div class="coming-soon">
                🚧 Lantai ${currentFloor}<br>
                Coming Soon
            </div>
        `;
        return;
    }

    // Generate Ruang 3.1 - 3.10
    for (let i = 1; i <= 10; i++) {
        container.innerHTML += `
            <div class="card border-green">
                <div class="card-header">
                    <h3>Ruang ${currentFloor}.${i}</h3>
                    <span class="badge">AVAILABLE</span>
                </div>
                <span class="text-muted">
                    Kapasitas 30–40 Kursi • Proyektor
                </span>
                <button class="btn-book green">
                    Booking Sekarang
                </button>
            </div>
        `;
    }
}

/* ================================
   EVENT TOMBOL LANTAI
================================ */
floorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        floorButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentFloor = btn.dataset.floor;
        renderRuangan();
    });
});

/* ================================
   MODAL BOOKING
================================ */
document.addEventListener("click", e => {
    if (e.target.classList.contains("btn-book")) {
        const roomName = e.target
            .closest(".card")
            .querySelector("h3").innerText;

        modalTitle.innerText = "Booking " + roomName;
        modal.style.display = "block";
    }
});

if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
}

window.onclick = e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

/* ================================
   TOAST FUNCTION
================================ */
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

/* ================================
   SUBMIT BOOKING
================================ */
if (bookingForm) {
    bookingForm.onsubmit = e => {
        e.preventDefault();

        const bookingData = {
            id: Date.now(),
            room: modalTitle.innerText.replace("Booking ", ""),
            course: courseName.value,
            time: `${checkIn.value} - ${checkOut.value}`
        };

        let bookings = JSON.parse(localStorage.getItem("campusBookings")) || [];
        bookings.push(bookingData);
        localStorage.setItem("campusBookings", JSON.stringify(bookings));

        showToast("✅ Booking berhasil!");
        modal.style.display = "none";
        bookingForm.reset();
    };
}

/* ================================
   RENDER AWAL
================================ */
renderRuangan();

bookingForm.onsubmit = e => {
    e.preventDefault();

    if (checkIn.value >= checkOut.value) {
        showToast("❌ Jam keluar harus lebih besar dari jam masuk", "error");
        return;
    }

    const room = modalTitle.innerText.replace("Booking ", "");

    let bookings = JSON.parse(localStorage.getItem("campusBookings")) || [];

    // 🔴 CEK BENTROK JAM
    const bentrok = bookings.some(b =>
        b.room === room &&
        checkIn.value < b.outTime &&
        checkOut.value > b.inTime
    );

    if (bentrok) {
        showToast("❌ Ruangan sudah dibooking di jam tersebut");
        return;
    }

    // ✅ JIKA AMAN
    const bookingData = {
        id: Date.now(),
        room: room,
        course: courseName.value,
        inTime: checkIn.value,
        outTime: checkOut.value,
        time: `${checkIn.value} - ${checkOut.value}`,
        date: new Date().toLocaleDateString("id-ID")
    };

    bookings.push(bookingData);
    localStorage.setItem("campusBookings", JSON.stringify(bookings));

    showToast("✅ Booking berhasil");
    modal.style.display = "none";
    bookingForm.reset();
};

/* ================================
   NAV TOGGLE (HAMBURGER)
================================ */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
}

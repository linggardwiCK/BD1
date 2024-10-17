document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    const nama = document.getElementById('nama').value;
    const tanggal = document.getElementById('tanggal').value;

    // Kirim data ke server
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama, tanggal }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log('Success:', data);
        loadData(); // Memuat ulang data setelah pengiriman berhasil
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
function loadData() {
    fetch('/get')
        .then(response => response.json())
        .then(data => {
            const dataList = document.getElementById('dataList');
            dataList.innerHTML = ''; // Kosongkan daftar sebelum menambahkan data baru
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.nama} - ${new Date(item.tanggal).toLocaleDateString()}`;
                dataList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}
fetch('/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nama, tanggal }),
})
.then(response => {
    console.log('Response status:', response.status);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log('Success:', data);
    loadData();
})
.catch((error) => {
    console.error('Error:', error);
});
// Panggil loadData saat halaman dimuat
loadData();
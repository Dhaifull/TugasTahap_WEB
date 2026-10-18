let schedules = [
    { id: 1, name: "Ulang Tahun", date: "2026-09-30", time: "19:00", category: "Pribadi", notes: "Acara ulang tahun keluarga" },
    { id: 2, name: "Kuliah Pemrograman Web", date: "2026-10-02", time: "08:00", category: "Kuliah", notes: "Belajar dengan giat" },
    { id: 3, name: "Pengerjaan Tugas Besar", date: "2026-10-05", time: "13:00", category: "Tugas", notes: "Mengerjakan TP" }
];

function renderSchedules(dataToRender) {
    const $tbody =$('#scheduleTableBody');
    $tbody.empty();

    if (dataToRender.length === 0) {
        $tbody.append('<tr><td colspan="4" class="text-center text-muted">Tidak ada jadwal ditemukan.</td></tr>');
        return;
    }

    dataToRender.forEach(function(item) {
        let badgeClass = 'badge';
        if (item.category === 'Kuliah') badgeClass = 'badge bg-primary text-white';
        else if (item.category === 'Tugas') badgeClass = 'badge bg-warning text-dark';
        else badgeClass = 'badge bg-success text-white';

        const row = `
            <tr>
                <td>${item.name}</td>
                <td><span class="date-badge">${item.date}</span></td>
                <td><span class="${badgeClass}">${item.category}</span></td>
                <td>
                    <a href="detail.html" class="btn btn-secondary btn-sm">Detail</a>
                    <button class="btn btn-danger btn-sm btn-delete" data-id="${item.id}">Hapus</button>
                </td>
            </tr>
        `;
        $tbody.append(row);
    });
}

$(document).ready(function() {
    if ($('#scheduleTableBody').length) {
        renderSchedules(schedules);
    }

    $('.card').hide().fadeIn(600);

    $(document).on('click', '.btn-delete', function(e) {
        e.preventDefault();
        const id = $(this).data('id');
        const $row =$(this).closest('tr');

        $row.fadeOut(400, function() {
            schedules = schedules.filter(item => item.id !== id);
            renderSchedules(schedules);
            showNotification('Jadwal berhasil dihapus!', 'danger');
        });
    });

    $('#formTambah').on('submit', function(e) {
        e.preventDefault();

        const name = $('#name').val().trim();
        const date = $('#date').val();
        const time = $('#time').val();
        const category = $('#category').val();
        const notes = $('#notes').val().trim();

        if (!name || !date || !time || !category) {
            showNotification('Harap isi semua field yang wajib!', 'warning');
            return;
        }

        const newItem = {
            id: schedules.length ? schedules[schedules.length - 1].id + 1 : 1,
            name: name,
            date: date,
            time: time,
            category: category,
            notes: notes
        };

        schedules.push(newItem);

        showNotification('Jadwal berhasil ditambahkan!', 'success');
        
        setTimeout(function() {
            window.location.href = 'Dashboard.html';
        }, 1000);
    });


    function showNotification(message, type = 'success') {
        $('.alert-notification').remove();
        
        let alertClass = 'alert-success';
        if (type === 'danger') alertClass = 'alert-danger';
        if (type === 'warning') alertClass = 'alert-warning';

        const $alert =$(`<div class="alert ${alertClass} alert-notification" role="alert" style="display: none; margin-bottom: 15px;">${message}</div>`);
        
        $('.card').first().prepend($alert);
        $alert.fadeIn(300).delay(2000).fadeOut(400, function() {$(this).remove();
        });
    }
});
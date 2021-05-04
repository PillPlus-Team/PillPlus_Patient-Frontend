import Swal from 'sweetalert2';

export const SwalDefault = Swal;

export const LoadingModal = Swal.mixin({
    allowEnterKey: false,
    allowOutsideClick: false,
})

export const ConfirmDialog = Swal.mixin({
    customClass: {
        confirmButton: 'w-24',
        cancelButton: 'w-24',
    },
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#3B82F6',
    cancelButtonColor: '#9CA3AF',
    showConfirmButton: true,
    showCancelButton: true,
    allowEnterKey: false,
});

export const DeleteAlertDialog = Swal.mixin({
    customClass: {
        confirmButton: 'w-24',
        cancelButton: 'w-24',
    },
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#9CA3AF',
    showConfirmButton: true,
    showCancelButton: true,
    allowEnterKey: false,
});

export const ImportantNotificationModal = Swal.mixin({
    customClass: {
        confirmButton: 'w-24',
    },
    confirmButtonText: 'รับทราบ',
    confirmButtonColor: '#3B82F6',
    showConfirmButton: true,
    showCancelButton: false,
    allowEnterKey: false,
    allowOutsideClick: false,
});

export const ChaningModal = Swal.mixin({
    customClass: {
        confirmButton: 'w-24',
        cancelButton: 'w-24',
    },
    confirmButtonColor: '#3B82F6',
    cancelButtonColor: '#9CA3AF',
    showCancelButton: true,
    showConfirmButton: true,
    allowEnterKey: false,
});

export const Toast = Swal.mixin({
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
    showCancelButton: false,
    position: 'bottom-end',
    width: 400,
});

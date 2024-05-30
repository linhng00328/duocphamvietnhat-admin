export default function () {
  return {
    oLanguage: {
      sLengthMenu: "Hiển thị _MENU_ mục",
      sLoadingRecords: "Vui lòng chờ - dữ liệu đang tải...",
      sZeroRecords: "Không tìm thấy dữ liệu",
      sSearch: "Tìm kiếm:",
      sEmptyTable: "Không có dữ liệu",
      sInfo: "Hiển thị từ _START_ đến _END_ trong số _TOTAL_ mục",
      infoEmpty: "Hiển thị từ 0 đến 0 trong số 0 mục",

      sProcessing: "Đang tải dữ liệu...",
      sPaginate: {
        sNext: "Sau",
        sPrevious: "Trước",
      },
    },
    language: {
      paginate: {
        next: "Sau",
        previous: "Trước",
      },
    },
    bDestroy: true,
    stateSave: true,
    aoColumnDefs: [
      { bSortable: false, aTargets: ["_all"] }, //disable ordering events and takeout the icon
    ],
    //     "columnDefs": [ {
    //         "targets": 'no-sort',
    //         "orderable": false,
    //   } ]
  };
}

import { confirmAlert } from "react-confirm-alert";

export default function alertYesOrNo(mess, onYes = () => {}, onNo = () => {}) {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div
          className="custom-ui"
          style={{
            width: "400px",
            padding: "30px",
            textAlign: "left",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 20px 75px rgba(0, 0, 0, 0.13)",
            color: "#666",
          }}
        >
          <h3>Lưu ý</h3>
          <p>{ mess } !</p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              columnGap: "20px",
            }}
          >
            <button
              onClick={() => {
                onYes();
                onClose();
              }}
              className="btn btn-primary"
            >
              Đồng ý
            </button>

            <button
              onClick={() => {
                onClose();
                onNo();
              }}
              className="btn btn-primary"
            >
              Không
            </button>
          </div>
        </div>
      );
    },
    buttons: [
      {
        label: "Đồng ý",
        onClick: () => alert("Click Yes"),
      },
    ],
  });
}

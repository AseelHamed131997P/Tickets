import { VoucherSettingsPayload } from "types";
import { api } from "utils";

export const AddVoucher = ({ number }: VoucherSettingsPayload) =>
  api.post("/voucher/settings", {
    voucherCount: number,
  });

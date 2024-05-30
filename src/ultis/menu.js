import getChannel, { IKIPOS } from "./channel";
import { ikipos_menu } from "./menu/ikipos_menu";
import { ikitech_menu } from "./menu/ikitech_menu";

export const menu = getChannel() == IKIPOS ? ikipos_menu : ikitech_menu;

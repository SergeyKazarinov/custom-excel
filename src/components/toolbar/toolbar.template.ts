import { IToolbarState } from '@src/types/state';

interface IButton {
  icon: string;
  isActive: boolean;
  style: IToolbarState;
}

const createButton = (button: IButton) => /* html */ `
<button
  class="toolbar__button ${button.isActive ? 'active' : ''}"
  data-type="button"
  data-style='${JSON.stringify(button.style)}'
  >
  <span
    class="material-icons"
    data-type="button"
    data-style='${JSON.stringify(button.style)}'
  > ${button.icon} </span>
</button>`;

const createToolbar = (state: IToolbarState) => {
  const toolbarButtons: IButton[] = [
    {
      icon: 'format_align_left',
      isActive: state.textAlign === 'left' || !state.textAlign,
      style: {
        textAlign: 'left',
      },
    },
    {
      icon: 'format_align_center',
      isActive: state.textAlign === 'center',
      style: {
        textAlign: 'center',
      },
    },
    {
      icon: 'format_align_right',
      isActive: state.textAlign === 'right',
      style: {
        textAlign: 'right',
      },
    },
    {
      icon: 'format_bold',
      isActive: state.fontWeight === 'bold',
      style: {
        fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold',
      },
    },
    {
      icon: 'format_italic',
      isActive: state.fontStyle === 'italic',
      style: {
        fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic',
      },
    },
    {
      icon: 'format_underline',
      isActive: state.textDecoration === 'underline',
      style: {
        textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline',
      },
    },
  ];

  return /* html */ `
  <div class="excel__toolbar toolbar">
    ${toolbarButtons.map((button) => createButton(button))}
  </div>
`;
};

export default createToolbar;

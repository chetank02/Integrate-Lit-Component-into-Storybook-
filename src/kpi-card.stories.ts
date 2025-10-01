import { html } from 'lit-html';
import './KpiCard';

export default {
  title: 'Components/KPI Card',
  component: 'kpi-card',
  argTypes: {
    label: { control: 'text' },
    current: { control: 'number' },
    previous: { control: 'number' },
    lastYear: { control: 'number' },
    percentChange: { control: 'number' },
    mode: {
      control: 'inline-radio',
      options: ['absolute', 'percent'],
    },
    height: { control: 'text' },
    width: { control: 'text' },
  },
};

const Template = (args: any) => html`
  <kpi-card
    label=${args.label}
    .current=${args.current}
    .previous=${args.previous}
    .lastYear=${args.lastYear}
    .percentChange=${args.percentChange}
    mode=${args.mode}
    height=${args.height}
    width=${args.width}
  ></kpi-card>
`;

export const Default = Template.bind({});
Default.args = {
  label: 'Revenue',
  current: 120000,
  previous: 100000,
  lastYear: 90000,
  percentChange: 20,
  mode: 'percent',
  height: 'auto',
  width: '300px',
};

export const NegativeChange = Template.bind({});
NegativeChange.args = {
  label: 'Churn Rate',
  current: 7500,
  previous: 9500,
  lastYear: 8000,
  percentChange: -21,
  mode: 'percent',
  height: 'auto',
  width: '300px',
};

export const AbsoluteChange = Template.bind({});
AbsoluteChange.args = {
  label: 'New Signups',
  current: 9500,
  previous: 9000,
  lastYear: 8700,
  percentChange: 5.5,
  mode: 'absolute',
  height: 'auto',
  width: '300px',
};

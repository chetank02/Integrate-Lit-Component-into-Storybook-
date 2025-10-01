import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
 
type DeltaMode = 'percent' | 'absolute';
 
@customElement('kpi-card')
export class KpiCard extends LitElement {
  @property({ type: String }) label: string = '';
  @property({ type: Number }) current = 0;
  @property({ type: Number }) previous = 0;
  @property({ type: Number }) lastYear = 0;
  @property({ type: Number }) percentChange = 0;
  @property({ type: String }) mode: DeltaMode = 'absolute';
  @property({ type: String }) height: string = 'auto';
  @property({ type: String }) width: string = '300px';
 
  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }
 
    .card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 8px;
      transition: box-shadow 0.2s ease;
    }
 
    .card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
 
    .label {
      font-size: 12px;
      font-weight: 600;
      color: #5c6470;
      text-transform: uppercase;
    }
 
    .value-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
 
    .value {
      font-size: 28px;
      font-weight: 600;
      color: #202b33;
    }
 
    .delta {
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      border-radius: 12px;
    }
 
    .delta.positive {
      color: #147d46;
      background: #e3f6ec;
    }
 
    .delta.negative {
      color: #c42b1c;
      background: #fdecec;
    }
 
    .delta.flat {
      color: #607080;
      background: #f1f4f7;
    }
 
    .subtext {
      font-size: 12px;
      color: #5c6470;
    }
  `;
 
  private get deltaValue(): number {
    return this.mode === 'percent'
      ? this.percentChange
      : this.current - this.previous;
  }
 
  private get deltaClass(): string {
    return this.deltaValue > 0 ? 'positive' : this.deltaValue < 0 ? 'negative' : 'flat';
  }
 
  private get deltaIcon(): string {
    return this.deltaValue > 0 ? '▲' : this.deltaValue < 0 ? '▼' : '■';
  }
 
  private formatNumber(n: number): string {
    if (n == null || isNaN(n)) return '-';
    const abs = Math.abs(n);
    if (abs >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2).replace(/\.00$/, '') + 'B';
    if (abs >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(/\.00$/, '') + 'M';
    if (abs >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return n.toLocaleString();
  }
 
  private formatDelta(): string {
    if (isNaN(this.deltaValue)) return '-';
    const sign = this.deltaValue > 0 ? '+' : '';
    return this.mode === 'percent'
      ? `${sign}${this.deltaValue.toFixed(1).replace(/\.0$/, '')}%`
      : `${sign}${this.formatNumber(this.deltaValue)}`;
  }
 
  render() {
    return html`
      <div
        class="card"
        style="height: ${this.height}; width: ${this.width};"
        aria-live="polite"
      >
        <div class="label" aria-label="KPI label">${this.label}</div>
 
        <div class="value-row">
          <div class="value" aria-label="${this.label} current value">
            ${this.formatNumber(this.current)}
          </div>
          <div class="delta ${this.deltaClass}" aria-label="${this.label} ${this.mode} change">
            <span>${this.deltaIcon}</span>
            <span>${this.formatDelta()}</span>
          </div>
        </div>
 
        <div class="subtext" aria-label="${this.label} last year value">
          last Year ${this.formatNumber(this.lastYear)}
        </div>
      </div>
    `;
  }
}
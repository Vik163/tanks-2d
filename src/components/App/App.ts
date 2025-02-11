import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/lib/constants/init';
import { Maps } from '../Maps/Maps';

export default function App() {
  const $ = (id: string) => document.getElementById(id);

  const cnv = $('canvas') as HTMLCanvasElement;
  const ctx = cnv.getContext('2d') as CanvasRenderingContext2D;

  cnv.width = CANVAS_WIDTH;
  cnv.height = CANVAS_HEIGHT;

  const maps = new Maps({ cnv, ctx });

  $('btn_editor')?.addEventListener('click', () => maps.openEditor());
}

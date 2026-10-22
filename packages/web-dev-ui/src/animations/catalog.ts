// Generated catalog: import individual component entrypoints for smaller bundles.
import type { AnimationProps } from "./styled-system";
import type { ComponentType } from "react";
import { OpeningTransitionAnimation } from "./components/opening-transition";
import { LoadingGalleryAnimation } from "./components/loading-gallery";
import { PopBallAnimation } from "./components/pop-ball";
import { PeelPaperAnimation } from "./components/peel-paper";
import { RollingBoxAnimation } from "./components/rolling-box";
import { BrakingBoxAnimation } from "./components/braking-box";
import { StackingBlocksAnimation } from "./components/stacking-blocks";
import { DominoAnimation } from "./components/domino";
import { ClatteringPanelAnimation } from "./components/clattering-panel";
import { PopBlocksAnimation } from "./components/pop-blocks";
import { ShutterAnimation } from "./components/shutter";
import { StageCurtainAnimation } from "./components/stage-curtain";
import { PaintLinesAnimation } from "./components/paint-lines";
import { YarnAnimation } from "./components/yarn";
import { ScrollUnrollAnimation } from "./components/scroll-unroll";
import { RattlingBlocksAnimation } from "./components/rattling-blocks";
import { SwapBlocksAnimation } from "./components/swap-blocks";
import { RippleAnimation } from "./components/ripple";
import { ScribbleAnimation } from "./components/scribble";
import { FlipPanelAnimation } from "./components/flip-panel";
import { FoldingPanelAnimation } from "./components/folding-panel";
import { BouncingBlocksAnimation } from "./components/bouncing-blocks";
import { ScaleBlocksAnimation } from "./components/scale-blocks";
import { DivingBlocksAnimation } from "./components/diving-blocks";
import { DownloadBarsAnimation } from "./components/download-bars";
import { RotatingBlocksAnimation } from "./components/rotating-blocks";
import { TissueAnimation } from "./components/tissue";
import { ZipperCurtainAnimation } from "./components/zipper-curtain";
import { FlipBlocksAnimation } from "./components/flip-blocks";
import { HeadphonesAnimation } from "./components/headphones";
import { LikeBurstAnimation } from "./components/like-burst";
import { LikeHeartsAnimation } from "./components/like-hearts";
import { LikeCrossesAnimation } from "./components/like-crosses";
import { BookmarkFoldAnimation } from "./components/bookmark-fold";
import { BookmarkPanelsAnimation } from "./components/bookmark-panels";
import { BookmarkSlideAnimation } from "./components/bookmark-slide";
import { WalkingCatAnimation } from "./components/walking-cat";
import { FlowerCatAnimation } from "./components/flower-cat";
import { LoadingWordAnimation } from "./components/loading-word";
import { LoadingRippleAnimation } from "./components/loading-ripple";
import { LoadingWaveAnimation } from "./components/loading-wave";
import { LoadingSquaresAnimation } from "./components/loading-squares";
import { LoadingOrbitAnimation } from "./components/loading-orbit";
export interface AnimationCatalogItem {
  id: string;
  name: string;
  title: string;
  source: string;
  category: string;
  width: number;
  height: number;
  component: ComponentType<AnimationProps>;
}
export const animationCatalog: readonly AnimationCatalogItem[] = [
  {
    id: "opening-transition",
    name: "OpeningTransitionAnimation",
    title: "CSS Animations",
    source: "2025-02-25/index.html",
    category: "transitions",
    width: 500,
    height: 500,
    component: OpeningTransitionAnimation,
  },
  {
    id: "loading-gallery",
    name: "LoadingGalleryAnimation",
    title: "CSS Animations",
    source: "2025-03-11/index.html",
    category: "loaders",
    width: 500,
    height: 350,
    component: LoadingGalleryAnimation,
  },
  {
    id: "pop-ball",
    name: "PopBallAnimation",
    title: "飛び出すCSSアニメーション",
    source: "2026-04-17/tips-1.html",
    category: "motion",
    width: 320,
    height: 320,
    component: PopBallAnimation,
  },
  {
    id: "peel-paper",
    name: "PeelPaperAnimation",
    title: "めくるCSSアニメーション",
    source: "2026-04-17/tips-2.html",
    category: "motion",
    width: 320,
    height: 320,
    component: PeelPaperAnimation,
  },
  {
    id: "rolling-box",
    name: "RollingBoxAnimation",
    title: "転がるCSSアニメーション",
    source: "2026-04-17/tips-3.html",
    category: "motion",
    width: 320,
    height: 320,
    component: RollingBoxAnimation,
  },
  {
    id: "braking-box",
    name: "BrakingBoxAnimation",
    title: "急ブレーキCSSアニメーション",
    source: "2026-04-17/tips-4.html",
    category: "motion",
    width: 320,
    height: 320,
    component: BrakingBoxAnimation,
  },
  {
    id: "stacking-blocks",
    name: "StackingBlocksAnimation",
    title: "積み木のCSSアニメーション",
    source: "2026-04-18/tips-1.html",
    category: "motion",
    width: 320,
    height: 320,
    component: StackingBlocksAnimation,
  },
  {
    id: "domino",
    name: "DominoAnimation",
    title: "ドミノのCSSアニメーション",
    source: "2026-04-18/tips-2.html",
    category: "motion",
    width: 320,
    height: 320,
    component: DominoAnimation,
  },
  {
    id: "clattering-panel",
    name: "ClatteringPanelAnimation",
    title: "カランカランのCSSアニメーション",
    source: "2026-04-18/tips-3.html",
    category: "motion",
    width: 320,
    height: 320,
    component: ClatteringPanelAnimation,
  },
  {
    id: "pop-blocks",
    name: "PopBlocksAnimation",
    title: "飛び出すCSSアニメーション",
    source: "2026-04-18/tips-4.html",
    category: "motion",
    width: 320,
    height: 320,
    component: PopBlocksAnimation,
  },
  {
    id: "shutter",
    name: "ShutterAnimation",
    title: "シャッター",
    source: "2026-04-22/tips-1.html",
    category: "transitions",
    width: 320,
    height: 320,
    component: ShutterAnimation,
  },
  {
    id: "stage-curtain",
    name: "StageCurtainAnimation",
    title: "幕",
    source: "2026-04-22/tips-2.html",
    category: "transitions",
    width: 320,
    height: 320,
    component: StageCurtainAnimation,
  },
  {
    id: "paint-lines",
    name: "PaintLinesAnimation",
    title: "塗り",
    source: "2026-04-22/tips-3.html",
    category: "transitions",
    width: 320,
    height: 320,
    component: PaintLinesAnimation,
  },
  {
    id: "yarn",
    name: "YarnAnimation",
    title: "糸",
    source: "2026-04-22/tips-4.html",
    category: "transitions",
    width: 320,
    height: 320,
    component: YarnAnimation,
  },
  {
    id: "scroll-unroll",
    name: "ScrollUnrollAnimation",
    title: "巻き物",
    source: "2026-04-25/tips-1.html",
    category: "motion",
    width: 320,
    height: 320,
    component: ScrollUnrollAnimation,
  },
  {
    id: "rattling-blocks",
    name: "RattlingBlocksAnimation",
    title: "ガタンガタン",
    source: "2026-04-25/tips-2.html",
    category: "motion",
    width: 320,
    height: 320,
    component: RattlingBlocksAnimation,
  },
  {
    id: "swap-blocks",
    name: "SwapBlocksAnimation",
    title: "交代",
    source: "2026-04-25/tips-3.html",
    category: "motion",
    width: 320,
    height: 320,
    component: SwapBlocksAnimation,
  },
  {
    id: "ripple",
    name: "RippleAnimation",
    title: "波紋",
    source: "2026-04-25/tips-4.html",
    category: "motion",
    width: 320,
    height: 320,
    component: RippleAnimation,
  },
  {
    id: "scribble",
    name: "ScribbleAnimation",
    title: "カキカキ",
    source: "2026-04-29/tips-1.html",
    category: "motion",
    width: 320,
    height: 320,
    component: ScribbleAnimation,
  },
  {
    id: "flip-panel",
    name: "FlipPanelAnimation",
    title: "ひっくり返す",
    source: "2026-04-29/tips-2.html",
    category: "motion",
    width: 320,
    height: 320,
    component: FlipPanelAnimation,
  },
  {
    id: "folding-panel",
    name: "FoldingPanelAnimation",
    title: "折りたたみ",
    source: "2026-04-29/tips-3.html",
    category: "motion",
    width: 320,
    height: 320,
    component: FoldingPanelAnimation,
  },
  {
    id: "bouncing-blocks",
    name: "BouncingBlocksAnimation",
    title: "ぴょんぴょん",
    source: "2026-04-29/tips-4.html",
    category: "motion",
    width: 320,
    height: 320,
    component: BouncingBlocksAnimation,
  },
  {
    id: "scale-blocks",
    name: "ScaleBlocksAnimation",
    title: "拡大・縮小",
    source: "2026-05-02/tips-1.html",
    category: "motion",
    width: 320,
    height: 320,
    component: ScaleBlocksAnimation,
  },
  {
    id: "diving-blocks",
    name: "DivingBlocksAnimation",
    title: "潜る",
    source: "2026-05-02/tips-2.html",
    category: "motion",
    width: 320,
    height: 320,
    component: DivingBlocksAnimation,
  },
  {
    id: "download-bars",
    name: "DownloadBarsAnimation",
    title: "ダウンロード・棒グラフ",
    source: "2026-05-02/tips-3.html",
    category: "motion",
    width: 320,
    height: 320,
    component: DownloadBarsAnimation,
  },
  {
    id: "rotating-blocks",
    name: "RotatingBlocksAnimation",
    title: "回転",
    source: "2026-05-02/tips-4.html",
    category: "motion",
    width: 320,
    height: 320,
    component: RotatingBlocksAnimation,
  },
  {
    id: "tissue",
    name: "TissueAnimation",
    title: "ティッシュ",
    source: "2026-05-14/tips-1.html",
    category: "objects",
    width: 320,
    height: 320,
    component: TissueAnimation,
  },
  {
    id: "zipper-curtain",
    name: "ZipperCurtainAnimation",
    title: "カーテン",
    source: "2026-05-14/tips-2.html",
    category: "objects",
    width: 320,
    height: 320,
    component: ZipperCurtainAnimation,
  },
  {
    id: "flip-blocks",
    name: "FlipBlocksAnimation",
    title: "ひっくり返す",
    source: "2026-05-14/tips-3.html",
    category: "objects",
    width: 320,
    height: 320,
    component: FlipBlocksAnimation,
  },
  {
    id: "headphones",
    name: "HeadphonesAnimation",
    title: "ヘッドフォン",
    source: "2026-05-14/tips-4.html",
    category: "objects",
    width: 320,
    height: 320,
    component: HeadphonesAnimation,
  },
  {
    id: "like-burst",
    name: "LikeBurstAnimation",
    title: "いいねアニメーション1",
    source: "2026-06-07/tips-1.html",
    category: "feedback",
    width: 320,
    height: 320,
    component: LikeBurstAnimation,
  },
  {
    id: "like-hearts",
    name: "LikeHeartsAnimation",
    title: "いいねアニメーション2",
    source: "2026-06-07/tips-2.html",
    category: "feedback",
    width: 320,
    height: 320,
    component: LikeHeartsAnimation,
  },
  {
    id: "like-crosses",
    name: "LikeCrossesAnimation",
    title: "いいねアニメーション3",
    source: "2026-06-07/tips-3.html",
    category: "feedback",
    width: 320,
    height: 320,
    component: LikeCrossesAnimation,
  },
  {
    id: "bookmark-fold",
    name: "BookmarkFoldAnimation",
    title: "ブックマーク1",
    source: "2026-06-08/tips-1.html",
    category: "feedback",
    width: 320,
    height: 320,
    component: BookmarkFoldAnimation,
  },
  {
    id: "bookmark-panels",
    name: "BookmarkPanelsAnimation",
    title: "ブックマーク2",
    source: "2026-06-08/tips-2.html",
    category: "feedback",
    width: 320,
    height: 320,
    component: BookmarkPanelsAnimation,
  },
  {
    id: "bookmark-slide",
    name: "BookmarkSlideAnimation",
    title: "ブックマーク3",
    source: "2026-06-08/tips-3.html",
    category: "feedback",
    width: 320,
    height: 320,
    component: BookmarkSlideAnimation,
  },
  {
    id: "walking-cat",
    name: "WalkingCatAnimation",
    title: "動く猫ちゃん1",
    source: "2026-06-09/tips-1.html",
    category: "characters",
    width: 320,
    height: 320,
    component: WalkingCatAnimation,
  },
  {
    id: "flower-cat",
    name: "FlowerCatAnimation",
    title: "動く猫ちゃん2",
    source: "2026-06-09/tips-2.html",
    category: "characters",
    width: 320,
    height: 320,
    component: FlowerCatAnimation,
  },
  {
    id: "loading-word",
    name: "LoadingWordAnimation",
    title: "LoadingWord",
    source: "2025-03-11/loading-1.svg",
    category: "loaders",
    width: 132,
    height: 132,
    component: LoadingWordAnimation,
  },
  {
    id: "loading-ripple",
    name: "LoadingRippleAnimation",
    title: "LoadingRipple",
    source: "2025-03-11/loading-2.svg",
    category: "loaders",
    width: 132,
    height: 132,
    component: LoadingRippleAnimation,
  },
  {
    id: "loading-wave",
    name: "LoadingWaveAnimation",
    title: "LoadingWave",
    source: "2025-03-11/loading-3.svg",
    category: "loaders",
    width: 132,
    height: 132,
    component: LoadingWaveAnimation,
  },
  {
    id: "loading-squares",
    name: "LoadingSquaresAnimation",
    title: "LoadingSquares",
    source: "2025-03-11/loading-4.svg",
    category: "loaders",
    width: 132,
    height: 132,
    component: LoadingSquaresAnimation,
  },
  {
    id: "loading-orbit",
    name: "LoadingOrbitAnimation",
    title: "LoadingOrbit",
    source: "2025-03-11/loading-5.svg",
    category: "loaders",
    width: 132,
    height: 132,
    component: LoadingOrbitAnimation,
  },
];

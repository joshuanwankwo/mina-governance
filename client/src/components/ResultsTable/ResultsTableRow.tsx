import React from "react";
import moment from "moment";
import makeBlockie from "ethereum-blockies-base64";
import { useMediaQuery } from "@react-hook/media-query";

import type { TableRowProps } from "@/types";

import { ResultsTableBubble } from "./ResultsTableBubble";
import { useKeywordStore } from "@/pages/Keyword/Keyword.store";

export const createPercent = (v: number, t: number): string => {
  const val = (v / t) * 100;
  if (Number.isNaN(val)) {
    return "XXX";
  }
  return val.toFixed(2);
};

export const ResultsTableRow: React.FC<TableRowProps> = ({ signal }) => {
  const { stats } = useKeywordStore((state) => ({ stats: state.stats }));
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const percent: () => string = (): string => {
    if (signal.stake_weight && stats) {
      return createPercent(signal.stake_weight, stats.yes + stats.no);
    }
    return "---";
  };

  if (isMobile) {
    return (
      <div className="w-full flex items-center justify-center py-4">
        <div className="flex flex-col items-start justify-center gap-0.5 w-full px-2">
          <div className="flex items-center gap-1">
            <img
              className="h-4 w-4 rounded-full opacity-70"
              src={makeBlockie(signal.account)}
            />
            <span className="text-[0.6rem] sm:text-[0.7rem] sm:leading-5 text-grayA-12 text-ellipsis overflow-hidden whitespace-nowrap medium mt-0.5">
              {signal.account}
            </span>
          </div>

          <div className="flex items-center justify-between w-full mt-0.5">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <span className="grid-table-content-mobile semibold">
                  {signal.height} -{" "}
                  {moment(new Date(signal.timestamp)).format(
                    "DD/MM/YYYY - hh:mm",
                  )}
                </span>
              </div>
              <span className="grid-table-content-mobile semibold italic">
                {signal.memo}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ResultsTableBubble status={signal.status}>
                <span className="grid-table-content-mobile medium">
                  {signal.status}
                </span>
              </ResultsTableBubble>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-grid-table-el w-full py-2 hover:bg-grayA-3 transition-colors duration-100">
      <div className="place-self-center">
        <span className="grid-table-content semibold">{signal.height}</span>
      </div>
      <div className="hidden lg:block place-self-center">
        <span className="grid-table-content semibold">
          {moment(new Date(signal.timestamp)).format("DD/MM/YYYY - hh:mm")}
        </span>
      </div>
      <div className="flex items-center gap-2 lg:gap-3 ml-10">
        <img
          className="h-5 w-5 lg:w-6 lg:h-6 rounded-full opacity-70"
          src={makeBlockie(signal.account)}
        />
        <span className="grid-table-content medium select-text">
          {signal.account}
        </span>
      </div>
      <div className="place-self-center">
        <span className="grid-table-content">
          {signal.stake_weight ? `${signal.stake_weight.toFixed(4)}` : "---"}
        </span>
      </div>
      <div className="place-self-center">
        <span className="grid-table-content">
          {signal.stake_weight ? `${percent()}` : "---"}
        </span>
      </div>
      <div className="place-self-center">
        <span className="grid-table-content medium">{signal.memo}</span>
      </div>
      <div className="place-self-center">
        <ResultsTableBubble status={signal.status}>
          <span className="grid-table-content medium">{signal.status}</span>
        </ResultsTableBubble>
      </div>
    </div>
  );
};

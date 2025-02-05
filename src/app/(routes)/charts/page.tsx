'use client'

import React, { useEffect, useRef, memo } from 'react'

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get the screen height
    const screenHeight = window.innerHeight

    // Set the height of the container dynamically
    if (container.current) {
      container.current.style.height = `${screenHeight}px`
    }

    // Ensure the chart is initialized only once
    const existingChart = container.current?.querySelector(
      '.tradingview-widget-container__widget iframe'
    )

    if (!existingChart) {
      const script = document.createElement('script')
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
      script.type = 'text/javascript'
      script.async = true
      script.innerHTML = `
        {
          "symbol": "BLACKBULL:US30",
          "interval": "15",
          "height": "${screenHeight}",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "backgroundColor": "rgba(238, 238, 238, 1)",
          "gridColor": "rgba(238, 238, 238, 1)",
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "watchlist": [
            "BLACKBULL:US30",
            "FOREXCOM:XAUUSD",
            "FX:GBPUSD",
            "FX:GBPJPY",
            "FX:GBPCAD",
            "FX:GBPNZD",
            "FX:GBPAUD",
            "FX:GBPCHF",
            "FX:EURUSD",
            "FX:EURJPY",
            "FX:EURGBP",
            "FX:EURCAD",
            "FX:EURAUD",
            "FX:EURNZD",
            "FX:EURCHF",
            "FX:USDJPY",
            "FX:USDCAD",
            "FX:USDCHF",
            "FX:NZDUSD",
            "FX:NZDJPY",
            "FX:NZDCAD",
            "FX:NZDCHF",
            "FX:AUDUSD",
            "FX:AUDNZD",
            "FX:AUDJPY",
            "FX:AUDCHF",
            "FX:AUDCAD",
            "TVC:JXY",
            "TVC:DXY",
            "TVC:EXY",
            "TVC:CXY",
            "ICMARKETS:BTCUSD",
            "ICMARKETS:ETHUSD",
            "COINBASE:ADABTC",
            "FOREXCOM:SOLUSD",
            "FOREXCOM:XRPUSD"
          ],
          "calendar": false,
          "hide_volume": true,
          "support_host": "https://www.tradingview.com"
        }`

      if (container.current) {
        container.current.appendChild(script)
      }
    }
  }, [])

  return (
    <div className='tradingview-widget-container' ref={container}>
      <div className='tradingview-widget-container__widget'></div>
    </div>
  )
}

export default memo(TradingViewWidget)

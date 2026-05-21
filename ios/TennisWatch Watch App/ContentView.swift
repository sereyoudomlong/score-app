//
//  ContentView.swift
//  TennisWatch Watch App
//
//  Created by Sereyoudom Long on 5/5/2026.
//

import SwiftUI
import WatchConnectivity

struct ContentView: View {
  @StateObject var viewModel = WatchViewModel()
  
  var scoreMap = ["0", "15", "30", "40", "Game"]
  
  
  func showScore(player: PlayerData, isDeuce: Bool) -> String{
    
    if isDeuce && player.adv{
      return "AD"
    }
    
    return scoreMap[player.scores]
    
  }
  
  func addPoint(playerKey: String, opponentKey: String, isDeuce: Bool){
    
    guard !viewModel.isSyncing else {return}
    
    if isDeuce{
      if viewModel.matchData[opponentKey].adv{
        viewModel.matchData[opponentKey].adv = false
      } else if viewModel.matchData[playerKey].adv{
        viewModel.matchData[playerKey].scores += 1
        viewModel.matchData[playerKey].adv.toggle()
      }
      else{
        viewModel.matchData[playerKey].adv.toggle()
      }
    }else{
      viewModel.matchData[playerKey].scores += 1
    }
    viewModel.matchData.version += 1
    
    DispatchQueue.global(qos: .userInitiated).async {
      sendSignalToPhone(action: "ADD_POINT", player: playerKey)
    }
    
  }
  
  func sendSignalToPhone(action: String, player: String = "none"){
    let payload: [String: Any] = ["action": action, "player": player]
    
    if WCSession.default.isReachable {
      WCSession.default.sendMessage(payload, replyHandler: { reply in print("Phone recieved signal: \(reply)")}, errorHandler: { error in print("Error sending signal: \(error.localizedDescription)")
        try? WCSession.default.updateApplicationContext(payload)
      })
    } else {
      try? WCSession.default.updateApplicationContext(payload)
    }
  }
    var body: some View {
      VStack {
        Button(action:{
          addPoint(playerKey: "player1", opponentKey: "player2", isDeuce: viewModel.matchData.isDuece)
        }) {
          VStack {
            Text("Player 1").font(.caption2).foregroundColor(.gray)
            Text(showScore(player: viewModel.matchData.player1, isDeuce: viewModel.matchData.isDuece)).font(.system(size: 40, weight: .bold, design: .rounded)).foregroundColor(.yellow)}.frame(maxWidth: .infinity, maxHeight: .infinity).background(Color.gray.opacity(0.2)).cornerRadius(12)
        }
        Button(action:{
          addPoint(playerKey: "player2", opponentKey: "player1", isDeuce: viewModel.matchData.isDuece)
        }) {
          VStack {
            Text("Player 2").font(.caption2).foregroundColor(.gray)
            Text(showScore(player: viewModel.matchData.player2, isDeuce: viewModel.matchData.isDuece)).font(.system(size: 40, weight: .bold, design: .rounded)).foregroundColor(.yellow)}.frame(maxWidth: .infinity, maxHeight: .infinity).background(Color.gray.opacity(0.2)).cornerRadius(12)
        }
      }.padding(5)
    }
  }

#Preview {
    ContentView()
}

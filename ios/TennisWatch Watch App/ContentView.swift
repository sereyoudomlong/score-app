//
//  ContentView.swift
//  TennisWatch Watch App
//
//  Created by Sereyoudom Long on 5/5/2026.
//

import SwiftUI

struct ContentView: View {
  @StateObject var viewModel = WatchViewModel()

  var scoreMap = ["0", "15", "30", "40", "Game"]
  
    
  func showScore(player: PlayerData, isDeuce: Bool) -> String{
    
    if isDeuce && player.adv{
      return "AD"
    }
    
    return scoreMap[player.scores]
    
  }
  
    var body: some View {
        VStack {
          Button(action:{
            print("Hello mfker")
          }) {
            VStack {
              Text("Player 1").font(.caption2).foregroundColor(.gray)
              Text(showScore(player: viewModel.matchData.player1, isDeuce: viewModel.matchData.isDuece)).font(.system(size: 40, weight: .bold, design: .rounded)).foregroundColor(.yellow)}.frame(maxWidth: .infinity, maxHeight: .infinity).background(Color.gray.opacity(0.2)).cornerRadius(12)
            }
          Button(action:{
            print("P2 Tapped")
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

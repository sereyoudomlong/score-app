//
//  WatchViewModel.swift
//  scoreapp
//
//  Created by Sereyoudom Long on 5/5/2026.
//

import WatchConnectivity
import SwiftUI
import Foundation
import Combine

struct PlayerData: Codable{
  var scores: Int = 0
  var games: Int = 0
  var sets: Int = 0
  var adv: Bool = false
}

struct MatchData: Codable{
  var player1: PlayerData = PlayerData()
  var player2: PlayerData = PlayerData()
  var isDuece: Bool = false
}

final class WatchViewModel: NSObject, ObservableObject, WCSessionDelegate{
    @Published var matchData = MatchData()
  
  override init() {
    super.init()
    if WCSession.isSupported() {
      let session = WCSession.default
      session.delegate = self
      session.activate()
    }
  }
  
  func session(_ session: WCSession, didReceiveApplicationContext applicationContext: [String : Any]) {
      print("WATCH RECEIVED DATA: \(applicationContext)")
      
      DispatchQueue.main.async {
          do {
              let jsonData = try JSONSerialization.data(withJSONObject: applicationContext)
              let decodedData = try JSONDecoder().decode(MatchData.self, from: jsonData)
              
              self.matchData = decodedData
              print("WATCH UPDATED DATA: \(self.matchData)")
              
          } catch {
              // This will tell you EXACTLY what's wrong (e.g., "Missing key 'game'")
              print("DECODING ERROR: \(error)")
          }
      }
  }

  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?){}
}


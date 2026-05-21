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
  var version: Int = 0
  
  subscript(playerKey: String) -> PlayerData {
    get {
      return playerKey == "player1" ? self.player1 : self.player2
    }
    set {
      if playerKey == "player1" {
        self.player1 = newValue
      }else{
        self.player2 = newValue
      }
    }
  }
}

final class WatchViewModel: NSObject, ObservableObject, WCSessionDelegate{
    @Published var matchData = MatchData()
    @Published var isSyncing: Bool = false
  
  override init() {
    super.init()
    if WCSession.isSupported() {
      let session = WCSession.default
      session.delegate = self
      session.activate()
    }
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
      
    print("WATCH RECEIVED DATA: \(message)")
        replyHandler(["status" : "success"])
      DispatchQueue.main.async {
          if let action = message["action"] as? String, action == "RESET_MATCH" {
            self.matchData.player1.scores = 0
            self.matchData.player1.adv = false
            self.matchData.player2.scores = 0
            self.matchData.player2.adv = false
            self.matchData.isDuece = false
            self.matchData.version = 0
            self.isSyncing = false
            return
        }
        
        
          do {
              let jsonData = try JSONSerialization.data(withJSONObject: message)
              let decodedData = try JSONDecoder().decode(MatchData.self, from: jsonData)
              
            guard decodedData.version >= self.matchData.version else {
              self.isSyncing = false
              return
            }
              self.matchData = decodedData
              self.isSyncing = false
              print("WATCH UPDATED DATA: \(self.matchData)")
              
          } catch {
              // This will tell you EXACTLY what's wrong (e.g., "Missing key 'game'")
            self.isSyncing = false
              print("DECODING ERROR: \(error)")
          }
      }
  }

  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?){}
}


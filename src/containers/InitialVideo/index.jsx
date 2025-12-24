import { useEffect } from 'react'

import { useVideoPlayer, VideoView } from 'expo-video'
import { StyleSheet } from 'react-native'

/**
 * @param {Object} props - Component props.
 * @param {() => void} props.onStart - Callback invoked immediately after playback starts.
 * @param {() => void} props.onEnded - Callback invoked after 3000 ms (simulated completion).
 */
export const InitialVideo = ({ onStart, onEnded }) => {
  const player = useVideoPlayer(
    require('../../../assets/videos/second_lock.mp4'),
    (player) => {
      player.loop = false
      player.muted = false
      player.volume = 1.0
    }
  )

  useEffect(() => {
    if (!player) {
      return
    }

    player.play()
    onStart()

    const timer = setTimeout(() => {
      onEnded()
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [player])

  return (
    <VideoView
      style={styles.logoVideo}
      player={player}
      allowsFullscreen={false}
      allowsPictureInPicture={false}
      nativeControls={false}
    />
  )
}

const styles = StyleSheet.create({
  logoVideo: {
    width: '80%',
    maxWidth: 282,
    aspectRatio: 1
  }
})

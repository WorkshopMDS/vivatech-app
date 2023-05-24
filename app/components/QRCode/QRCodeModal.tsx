import { useMemo, useRef } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import QRCodeModalBackground from './QRCodeModalBackground'
import QRCodeView from './QRCodeView'
import { useAppSelector } from '../../hooks'

interface QRCodeModalProps {
  toggle: () => void
}

function QRCodeModal({ toggle }: QRCodeModalProps) {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { codeSent } = useAppSelector(state => state.tickets)
  const snapPoints = useMemo(() => (!codeSent ? ['52%'] : ['25%']), [codeSent])

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      enablePanDownToClose
      bottomInset={16}
      detached
      style={{
        flex: 1,
        marginHorizontal: 16,
      }}
      handleIndicatorStyle={{
        backgroundColor: 'white',
      }}
      backgroundComponent={({ style }) => (
        <QRCodeModalBackground {...{ style }} />
      )}
      onClose={toggle}
      keyboardBehavior="interactive"
    >
      <QRCodeView />
    </BottomSheet>
  )
}

export default QRCodeModal

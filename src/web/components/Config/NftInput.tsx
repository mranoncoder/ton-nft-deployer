import styled from 'styled-components'
import { Nft } from '../../../models'
import { parseCsv } from '../../../parseCsv'

import { InputGroup, Label, LabelText, LabelTitle } from './styled'

const FileInput = styled.input`
  margin: 0.5rem 0;
  /* padding: 0.25rem; */
  height: 2rem;
`

export default function NftInput({
  nfts,
  setNfts,
}: {
  nfts: Nft[]
  setNfts: React.Dispatch<React.SetStateAction<Nft[]>>
}) {
  const inputChange = async (e) => {
    const files: File[] = e.target.files

    if (files.length !== 1) {
      return
    }

    const content = await files[0].text()
    const nfts = parseCsv(content)

    setNfts(nfts)
  }

  return (
    <InputGroup>
      <Label htmlFor="NftInput">
        <LabelTitle>CSV To Deploy From</LabelTitle>
        <LabelText>Format: id,owner</LabelText>
        <LabelText>Current NFTs count: {nfts.length}</LabelText>
      </Label>
      <FileInput type="file" id="NftInput" onChange={inputChange} />
    </InputGroup>
  )
}

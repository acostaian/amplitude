export default class AudioData {

    public isStereo: boolean;
    public mainTimeDomainData: Uint8Array;
    public secondaryTimeDomainData: Uint8Array;
    public mainFrequencyData: Uint8Array;
    public secondaryFrequencyData: Uint8Array;

    constructor(bufferLength: number, isStereo: boolean) {
        this.isStereo = isStereo;
        this.mainTimeDomainData = new Uint8Array(bufferLength);
        this.secondaryTimeDomainData = new Uint8Array(bufferLength);
        this.mainFrequencyData = new Uint8Array(bufferLength);
        this.secondaryFrequencyData = new Uint8Array(bufferLength);
    }

}
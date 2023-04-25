import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CallService} from '@app/_services/call.service';
import {MeetingRecorder} from '@app/_helpers/meetingRecorder';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.less']
})
export class MeetingComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('videoConference') remoteVideo;
  isCalling = false;
  hasCallEnded = false;
  isRecording = false;
  hasRecorded = false;
  meetingRecorder: MeetingRecorder;

  constructor(private callService: CallService) {
  }

  ngAfterViewInit() {
    console.log(this.remoteVideo);
    this.callService.setVideoElement(this.remoteVideo);
  }

  ngOnInit(): void {
  }

  call() {
    this.callService.initialize();
    this.isCalling = true;
  }

  endCall() {
    this.remoteVideo.nativeElement.srcObject = null;
    this.callService.sendDisconnectMessage();
    this.callService.stopMeeting();
    this.hasCallEnded = true;
  }

  ngOnDestroy(): void {
    this.endCall();
  }

  startRecording() {
    this.meetingRecorder = new MeetingRecorder(this.callService.remoteStream);
    this.meetingRecorder.startRecording();
    this.isRecording = !this.isRecording;
    this.hasRecorded = true;
  }

  isReadyToRecord(): boolean {
    return this.callService.remoteStream.getTracks().length !== 0;
  }

  stopRecording() {
    this.meetingRecorder.stopRecording();
    this.isRecording = !this.isRecording;
  }

  sendRecord() {
    if (this.hasRecorded) {
      const file = this.meetingRecorder.getVideoFile('test');
    }

    // send file to server
    console.log('file is ready to send');
  }
}
